import { Navbar } from "@/components";
import React from "react";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
   <>
    <Navbar/>
    <main className="flex flex-col items-center p-24">
      <span className="text-lg">Hello, World!</span>
      { children }
    </main>
   </>
  );
}
