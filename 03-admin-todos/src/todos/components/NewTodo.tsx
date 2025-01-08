"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

// import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";
import { addTodo, deleteCompleted } from "../actions/todo-actions";

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;

    // todosApi.createTodo(description);
    await addTodo(description) // server action
    setDescription("");
    // router.refresh();
  };

 

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="flex-1 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-slate-900 hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-slate-900 hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};
