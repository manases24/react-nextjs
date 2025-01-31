"use client";

import React from "react";
import { Pagination } from "@/components";
import type { User } from "@/interfaces";
import { changeUserRole } from "@/actions";

interface Props {
  users: User[];
}

const roles = [
  { id: crypto.randomUUID(), value: "admin", label: "Admin" },
  { id: crypto.randomUUID(), value: "user", label: "User" },
];

export const UsersTable = ({ users }: Props) => {
  return (
    <>
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              scope="col"
            >
              Email
            </th>
            <th
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              scope="col"
            >
              Nombre completo
            </th>
            <th
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              scope="col"
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  className="text-sm w-full p-2 text-gray-900"
                  value={user.role}
                  onChange={(e) => changeUserRole(user.id, e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
