import { NextResponse, NextRequest } from "next/server";
import * as argon2 from "argon2";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user

  const user = await prisma.user.create({
    data: {
      email: "superman@google.com",
      password: await argon2.hash("superman"),
      roles: ["user", "admin", "super-user"],
      todos: {
        create: [{ description: "Piedra del espacio" }],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Piedra del alma", complete: true },
  //     { description: "Piedra del poder" },
  //     { description: "Piedra del tiempo" },
  //     { description: "Piedra del espacio" },
  //     { description: "Piedra del realidad" },
  //   ],
  // });

  return NextResponse.json({ message: "Seed Executed" });
}
