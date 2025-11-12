'use server'
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";
export async function getProfile() {
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
      image: true,
      createdAt: true,
      updatedAt: true,
      profile: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  return {
    ...user,
    profile: user.profile || {
      id: "",
      userId: user.id,
      firstName: null,
      lastName: null,
      bio: null,
      phone: null,
      avatarUrl: null,
      city: null,
      country: null,
      birthDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const bio = formData.get("bio") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const birthDate = formData.get("birthDate") as string;

  if (!firstName || !lastName || !email) {
    throw new Error("Required fields are missing");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      email,
      profile: {
        update: {
          firstName,
          lastName,
          phone,
          bio,
          city,
          country,
          birthDate: birthDate ? new Date(birthDate) : null,
        },
      },
    },
  });

  return { message: "Profile updated successfully" };
}



