import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { postSchema } from "./yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") ?? "10");
  const skip = +(searchParams.get("take") ?? "0");

  if (isNaN(take))
    return NextResponse.json(
      { error: "Take debe ser un numero" },
      { status: 400 }
    );

  if (isNaN(skip))
    return NextResponse.json(
      { error: "Take debe ser un numero" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    skip: skip,
    take: take,
  });

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({ data: { complete, description } });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
