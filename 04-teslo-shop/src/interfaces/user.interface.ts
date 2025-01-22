export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: string;
  image?: string | null;
}

export interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    role: string;
    image?: string;
  };
}
