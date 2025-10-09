import { ICartState } from "@/types/products";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "../../../../lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const data = await req.formData();

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const itemsJson = data.get("items") as string;

    const street = data.get("street") as string;
    const city = data.get("city") as string;
    const country = data.get("country") as string;
    const zip = data.get("zip") as string;
    console.log(name, email, phone, itemsJson, street, city, country, zip)

    if (!name || !email || !phone || !street || !city || !country || !zip || !itemsJson) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const items: ICartState[] = JSON.parse(itemsJson);

    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.id) } },
      select: { id: true, finalPrice: true, quantity: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: "Some products not found" }, { status: 404 });
    }

    let totalPrice = 0;
    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.id)!;
      if ((product.quantity ?? 0) < item.quantity) {
        throw new Error(`Not enough stock for product ${item.id}`);
      }
      totalPrice += Number(product.finalPrice) * item.quantity;
      return {
        productId: item.id,
        quantity: item.quantity,
        price: Number(product.finalPrice),
      };
    });

    let addressId: number | undefined = undefined;

    if (session?.user?.id) {
      const newAddress = await prisma.address.create({
        data: {
          street,
          city,
          country,
          zip,
          userId: session.user.id,
        },
      });
      addressId = newAddress.id;
    }

    const order = await prisma.order.create({
      data: {
        name,
        email,
        phone,
        status: "PENDING",
        userId: session?.user?.id ?? null,
        shippingAddress: `${street}, ${city}, ${zip}, ${country}`,
        addressId, 
        items: { create: orderItemsData },
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      totalPrice,
      message: "Order created successfully",
      order,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error || "Failed to create order" },
      { status: 500 }
    );
  }
}