"use server";
import bcrypt from "bcryptjs";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";
export async function changeEmail(newEmail: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { email: newEmail },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

interface IChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export async function changePassword({
  oldPassword,
  newPassword,
}: IChangePasswordInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) throw new Error("User not found");

    const isValid = bcrypt.compare(oldPassword, newPassword);
    if (!isValid) throw new Error("Current password is incorrect");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });
  
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
