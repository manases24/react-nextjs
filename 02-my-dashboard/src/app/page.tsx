import { redirect } from "next/navigation";

export default function Home() {
  // function para redireccionar a una persona a la page que queramos
  redirect("/dashboard/counter");
}
