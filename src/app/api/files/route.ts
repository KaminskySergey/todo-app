import { pinata } from "@/utils/pinata";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const file = data.get("file") as unknown as File;

    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);

    
    const profile = await prisma.profile.update({
        where: { userId: session.user.id  },
        data: { avatarUrl: url },
    })
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: profile.avatarUrl },
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}