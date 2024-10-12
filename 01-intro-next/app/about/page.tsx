import type { Metadata } from "next";

// Ayuda a Google para el SEO
export const metadata: Metadata = {
 title: 'About Page',
 description: 'Esta es la pagina de informacion para conocernos',
 keywords: ["About Page", "Manases", "About"]
};


export default function AboutPage() {
  return (
    <>
      <span className="text-7xl">About Page</span>
    </>
  );
}
