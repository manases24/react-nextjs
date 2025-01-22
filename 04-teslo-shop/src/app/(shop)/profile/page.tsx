import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { ShowJson } from "./ui/ShowJson";

export default async function ProfilePage() {
  // Obtén la sesión del usuario
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { name, email, role, image } = session.user;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Title title="Perfil" />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {image ? (
              <img
                src={image}
                alt={`${name}'s avatar`}
                className="w-24 h-24 rounded-full border-4 border-gray-200"
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
        <ShowJson session={session} />
      </div>
    </div>
  );
}
