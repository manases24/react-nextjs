"use server"; // solo se ejecuta del lado del servidor pero el cliente lo puede llamar

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

// Si desarrollas aplicaciones en Nextjs que utilizan lógica de Backend consultando a una base de datos o haciendo peticiones a una REST API,
// otro método que debes conocer es los server actions, los cuales permiten capturar datos de formulario sin que necesites crear una REST API usando la carpeta api,
// lo que te permite tener una aplicación web que interactúe tanto para leer como para crear datos directamente desde tus paginas de React

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo with id ${id} not found`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: "Error when todo is created",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath("/dashboard/server-todos");
};
