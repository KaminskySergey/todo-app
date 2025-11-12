import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isPassword = await bcrypt.compare(password, user.password!);
    if (!isPassword)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );

    await prisma.user.update({ where: { id: user.id }, data: { email } });

    return NextResponse.json({ message: "Email changed successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
