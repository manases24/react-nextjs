import { IoPersonOutline } from "react-icons/io5";

interface LinkItem {
  icon: typeof IoPersonOutline;
  href: string;
  label: string;
}

export const Link: LinkItem[] = [
  {
    icon: IoPersonOutline,
    href: "/",
    label: "Perfil",
  },
];
