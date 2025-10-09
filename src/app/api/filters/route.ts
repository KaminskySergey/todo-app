import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });

    const brands = await prisma.brand.findMany({
      select: { id: true, name: true },
    });

    const categoryCounts = await prisma.product.groupBy({
      by: ["categoryId"],
      _count: { id: true },
    });

    const categoriesWithCount = categories.map((cat) => {
      const countObj = categoryCounts.find((c) => c.categoryId === cat.id);
      return { ...cat, count: countObj?._count.id ?? 0 };
    });

    const brandCounts = await prisma.product.groupBy({
      by: ["brandId"],
      _count: { id: true },
    });

    const brandsWithCount = brands.map((brand) => {
      const countObj = brandCounts.find((b) => b.brandId === brand.id);
      return { ...brand, count: countObj?._count.id ?? 0 };
    });

    const subcategoryCounts = await prisma.product.groupBy({
      by: ["subcategory"],
      _count: { id: true },
    });

    const subcategoriesWithCount = subcategoryCounts.map((sub) => ({
      name: sub.subcategory,
      count: sub._count.id,
    }));

    const productsPrice = await prisma.product.aggregate({
      _min: { finalPrice: true },
      _max: { finalPrice: true },
    });

    return NextResponse.json({
      filters: {
        category: categoriesWithCount,
        brand: brandsWithCount,
        subcategory: subcategoriesWithCount,
      },
      price: {
        minPrice: productsPrice._min.finalPrice,
        maxPrice: productsPrice._max.finalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
