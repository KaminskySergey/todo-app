"use server";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";
import { IAddress } from "@/types/address";

export const getAddressAction = async (): Promise<IAddress | null> => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const address = await prisma.address.findFirst({
    where: { userId: session.user.id },
    select: {
      id: true,
      street: true,
      city: true,
      country: true,
      zip: true,
    },
  });

  return address;
};

export const createAddressAction = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const street = formData.get("street") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const zip = formData.get("zip") as string;

  if (!street || !city || !country || !zip) {
    throw new Error("All fields are required");
  }

  const existingAddress = await prisma.address.findFirst({
    where: { userId: session.user.id },
  });

  let address;
  if (existingAddress) {
    address = await prisma.address.update({
      where: { id: existingAddress.id },
      data: { street, city, country, zip },
    });
  } else {
    address = await prisma.address.create({
      data: { street, city, country, zip, userId: session.user.id },
    });
  }

  return address;
};
