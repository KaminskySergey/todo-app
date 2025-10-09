import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function GET(
  req: NextRequest,
  {params}: { params: Promise<{ id: string }>}
) {
  const id =  Number((await params).id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(product);
}
