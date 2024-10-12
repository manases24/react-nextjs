import type { Metadata } from "next";

// Ayuda a Google para el SEO
export const metadata: Metadata = {
 title: 'Pricing Page',
 description: 'Esta es la pagina de precios de mi servicio',
 keywords: ["Princing Page", "Manases", "Precios"]
};

export default function PricingPage() {
  return (
    <>
      <span className="text-7xl">Pricing Page</span>
    </>
  );
}
