"use client";

import NotFoundPage from "../not-found";

interface Props {
  params: { id: string };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (id === "kids") {
    return <NotFoundPage />;
  }
  return (
    <div>
      <h1>Category Page</h1>
    </div>
  );
}
