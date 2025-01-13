"use client";

import { initialData } from "@/seed/seed";

import { PageNotFound, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";

interface Props {
  params: { id: Category };
}

const seedProduct = initialData.products;

export default function CategoryIdPage({ params }: Props) {
  const { id } = params;
  const products = seedProduct.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Unisex",
  };

  if (!labels[id]) {
    return <PageNotFound />;
  }

  return (
    <>
      <Title
        className="mb-2"
        title={`Articulos para ${labels[id]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
    </>
  );
}
