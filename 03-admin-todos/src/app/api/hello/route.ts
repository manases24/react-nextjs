import { NextResponse, NextRequest } from "next/server";

// creamos un REST Full API endpoint para conectarnos a una DB
export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      message: "Hello World",
    }),
    { status: 200 }
  );
}
