export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getUserSessionServer } from "@/auth/actions/auth-action";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <span className="text-3xl mb-10">Rest TODOS</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}
