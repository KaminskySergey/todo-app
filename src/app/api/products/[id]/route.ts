import prisma from "../../../../../lib/prisma";
export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid product id" }), {
        status: 400,
      });
    }

    const product = await prisma.product.findUnique({
      where: { id }, 
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("❌ Product fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
