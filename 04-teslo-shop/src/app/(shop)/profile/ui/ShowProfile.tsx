"use client";

interface Props {
  name: string;
  email: string;
  role: string;
  image: string;
}

export const ShowProfile = ({ name, email, role, image }: Props) => {
  return (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
        {image ? (
          <img
            className="w-24 h-24 rounded-full border-4 border-gray-200"
            src={image}
            alt={`${name}'s avatar`}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
      <p className="text-gray-600">{email}</p>
      <p className="mt-2 text-sm text-gray-500">
        <span className="font-medium">Role:</span> {role || "Usuario"}
      </p>
    </div>
  );
};