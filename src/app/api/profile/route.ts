import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

import { auth } from "../../../../lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { user: true },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

