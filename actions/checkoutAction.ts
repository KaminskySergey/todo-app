"use server";
import { ICartState } from "@/types/products";
import prisma from "../lib/prisma";
import { stripe } from "../lib/stripi";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/app/lib/authOptions";

export const checkoutAction = async (formData: FormData) => {
  const authSession = await getServerSession(authOptions);

  const itemsJson = formData.get("items") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const addressIdRaw = formData.get("addressId");
  const addressId = addressIdRaw ? Number(addressIdRaw) : null;

  const street = formData.get("street") as string;
  const city = formData.get("city") as string;
  const zip = formData.get("zip") as string;
  const country = formData.get("country") as string;
console.log(name, email, phone, itemsJson, '4444444444444444444444444444444444444444444')
  if (!name || !email || !phone || !itemsJson) {
    throw new Error("Missing fields");
  }

  const items = JSON.parse(itemsJson) as ICartState[];

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.id) } },
    select: { id: true, name: true, finalPrice: true, quantity: true },
  });

  let totalPrice = 0;
  const orderItemsData = items.map((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) throw new Error(`Product ${item.id} not found`);

    const productQuantity = product.quantity ?? 0;
    const productPrice = Number(product.finalPrice);

    if (productQuantity < item.quantity)
      throw new Error(`Not enough stock for product ${item.id}`);

    totalPrice += productPrice * item.quantity;

    return {
      quantity: item.quantity,
      price: productPrice,
      product: { connect: { id: item.id } },
    };
  });

  const shippingAddress =
    street && city && zip && country
      ? `${street}, ${city}, ${zip}, ${country}`
      : "";

  const orderData: Prisma.OrderCreateInput = {
    name,
    email,
    phone,
    shippingAddress,
    status: "PENDING",
    items: {
      create: orderItemsData,
    },
    user: authSession?.user
      ? { connect: { id: authSession.user.id } }
      : undefined,
    address:
      addressId && authSession?.user
        ? { connect: { id: addressId } }
        : undefined,
  };

  const order = await prisma.order.create({
    data: orderData,
    include: {
      items: { include: { product: true } },
      address: true,
    },
  });

  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: { quantity: { decrement: item.quantity } },
    });
  }

  const line_items = items.map((el) => ({
    price_data: {
      currency: "usd",
      product_data: { name: el.name },
      unit_amount: Math.round(el.finalPrice * 100),
    },
    quantity: el.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/success/orderBy/${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
    metadata: { orderId: order.id.toString() },
    customer_email: email,
  });

  return redirect(session.url ?? "/checkout");
};
