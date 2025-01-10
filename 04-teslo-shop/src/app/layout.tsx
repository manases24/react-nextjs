import type { Metadata } from "next";
import { geistSans, titleFont } from "./config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "El mejor E-commerce de Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${titleFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
