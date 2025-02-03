import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { ShowJson } from "./ui/ShowJson";
import { ShowProfile } from "./ui/ShowProfile";

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
        <ShowProfile
          name={name}
          email={email}
          role={role}
          image={image || ""}
        />
        <ShowJson session={session} />
      </div>
    </div>
  );
}