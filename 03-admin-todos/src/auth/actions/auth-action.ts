import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import * as argon2 from "argon2";

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  // Verificar la contraseña usando argon2
  const isPasswordValid = await argon2.verify(user.password ?? "", password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  // Crear un hash seguro para la contraseña
  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: email.split("@")[0],
    },
  });

  return user;
};
