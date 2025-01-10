import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// lo usaremos para agregar clases dinamicas
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
