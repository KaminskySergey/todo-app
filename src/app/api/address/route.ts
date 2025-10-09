import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const newAddress = await prisma.address.create({
      data: {
        street: body.street,
        city: body.city,
        country: body.country,
        zip: body.zip,
        userId: session.user.id, 
      },
    });

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
