import React from "react";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div>
      <h1>Hello Root Layout About</h1>
      {children}
    </div>
  );
}
