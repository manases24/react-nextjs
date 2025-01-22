import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Title } from "@/components";

export default async function ProfilePage() {
  // session del usuario
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
        <div className="bg-gray-100 p-4">
          <h4 className="text-gray-700 font-medium">Datos JSON:</h4>
          <pre className="bg-gray-800 text-gray-200 text-sm p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(session.user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
