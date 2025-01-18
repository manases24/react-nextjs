import type { Metadata } from "next";
import { geistSans, titleFont } from "./config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop'
  },
  description: 'Una tienda virtual de productos',
}

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
