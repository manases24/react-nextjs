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
        <div className="flex flex-col space-y-3 p-5 bg-gray-50 rounded-md shadow-sm w-72 max-w-full">
          <span className="text-base font-medium text-gray-800">
            {session.user?.name ?? "No Name"}
          </span>
          <span className="text-sm text-gray-600">
            {session.user?.email ?? "No Email"}
          </span>
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-14 h-14 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <span className="text-sm text-gray-400">No Image</span>
          )}
        </div>
      </WidgetItem>
    </div>
  );
}
