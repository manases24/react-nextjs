import { NextResponse, NextRequest } from "next/server";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";
import { putSchema } from "../yup";

interface Segments {
  params: { id: string };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${params.id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${params.id} not found` },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
