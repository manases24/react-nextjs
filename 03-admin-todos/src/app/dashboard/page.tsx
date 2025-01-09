import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { WidgetItem } from "@/components";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado - ServerSide">
        <div>Dashboard content</div>
      </WidgetItem>
    </div>
  );
}
