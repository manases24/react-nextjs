export const revalidate = 0;

import { redirect } from "next/navigation";
import { Pagination, Title } from "@/components";
import { getPaginatedUsers } from "@/actions";
import { UsersTable } from "./ui/UsersTable";

// https://tailwindcomponents.com/component/hoverable-table
export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />
      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={1} />
      </div>
    </>
  );
}
