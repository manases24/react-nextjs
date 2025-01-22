"use client";

import { Session, User } from "@/interfaces/user.interface";
import { useState } from "react";

interface Props {
  session:Session
}

export const ShowJson = ({ session }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-gray-100 p-4">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        {show ? "Ocultar JSON" : "Ver JSON"}
      </button>
      {show && (
        <div className="mt-4">
          <h4 className="text-gray-700 font-medium">Datos JSON:</h4>
          <pre className="bg-gray-800 text-gray-200 text-sm p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
