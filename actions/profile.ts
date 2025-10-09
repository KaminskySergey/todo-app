'use server'
import { IProfile } from "@/types/profile";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

// export async function getProfile() {
//     const cookieHeader = (await headers()).get("cookie") || "";
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
//         cache: "no-store",
//         headers: {
//             cookie: cookieHeader
//         },
//     });
//     console.log(res)

//     if (!res.ok) throw new Error("Failed to fetch profile");

//     return res.json();
// }

export async function getProfile(): Promise<IProfile> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}



export async function changeInfoDetailsAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!firstName || !email) {
    throw new Error("Are required");
  }

  const name = `${firstName} ${lastName}`.trim();
  const updatedUser = await prisma.user.update({
    where: {id: session.user.id},
    data: {
      name,
      email,
      phone
    }
  })
  return updatedUser
}