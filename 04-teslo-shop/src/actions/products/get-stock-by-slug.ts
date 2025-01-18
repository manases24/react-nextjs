"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: { slug: slug },
      select: { inStock: true },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    throw new Error("Error al obtener producto por slug");
  }
};
