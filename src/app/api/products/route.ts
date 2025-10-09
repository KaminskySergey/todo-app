import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRatingParam = searchParams.get("minRating");
  const maxRatingParam = searchParams.get("maxRating");

  const page = parseInt(searchParams.get("page") || "1", 10); 
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const skip = (page - 1) * limit;
  const take = limit;

  

  try {
    const where: Prisma.ProductWhereInput = {};

    if (query) {
      where.name = { contains: query, mode: "insensitive" };
    }

    if (category) {
      where.category = {
        is: { name: { equals: category, mode: "insensitive" } },
      };
    }

    if (brand) {
      where.brand = {
        is: { name: { equals: brand, mode: "insensitive" } },
      };
    }

    if (subcategory) {
      where.subcategory = { equals: subcategory, mode: "insensitive" };
    }

    const minPriceDecimal = minPrice ? new Prisma.Decimal(minPrice) : undefined;
    const maxPriceDecimal = maxPrice ? new Prisma.Decimal(maxPrice) : undefined;

    if (minPriceDecimal || maxPriceDecimal) {
      where.finalPrice = {
        ...(minPriceDecimal && { gte: minPriceDecimal }),
        ...(maxPriceDecimal && { lte: maxPriceDecimal }),
      };
    }

    const minRating = minRatingParam ? Number(minRatingParam) : undefined;
    const maxRating = maxRatingParam ? Number(maxRatingParam) : undefined;

    if (minRating !== undefined || maxRating !== undefined) {
      where.rating = {};
      if (minRating !== undefined) where.rating.gte = minRating;
      if (maxRating !== undefined) where.rating.lte = maxRating;
    }

    const totalRecords = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalRecords / limit);

    const products = await prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
      },
      skip,
      take,
    });

    return NextResponse.json({
      results: products,
      totalRecords,
      totalPages,
      limit,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
