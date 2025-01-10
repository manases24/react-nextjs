"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Client Side");
  }, []);

  return (
    <div>
      <h1>Page Profile</h1>
      <hr />

      <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md w-80 max-w-full">
        <span className="text-lg font-semibold text-gray-800">
          {session?.user?.name ?? "No Name"}
        </span>
        <span className="text-sm text-gray-600">
          {session?.user?.email ?? "No Email"}
        </span>
        <span className="text-sm text-gray-600">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            "No Image"
          )}
        </span>
        <span className="text-sm text-gray-600">
          {session?.user?.id ?? "No UUID"}
        </span>
        <span className="text-sm text-gray-600">
          Roles: {session?.user?.roles?.join(", ") ?? "No Roles"}
        </span>
      </div>
    </div>
  );
}
