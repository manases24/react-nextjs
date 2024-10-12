import type { Metadata } from "next";

// Ayuda a Google para el SEO
export const metadata: Metadata = {
 title: 'Contact Page',
 description: 'Esta es la pagina de contacto de la empresa',
 keywords: ["Contact Page", "Manases", "Contacto"]
};

export default function ContactPage() {
  return (
    <>
      <span className="text-7xl">Contact Page</span>
    </>
  );
}
