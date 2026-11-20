import { createContext, useContext } from "react";

export type UserRole = "student" | "mentor";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;

  department?: string;
  course?: string;
  phone?: string;
  year?: string;

  expertise?: string;
  experience?: string;
  organization?: string;
}

export interface AuthContextType {
  user: User | null;
  users: User[];

  login: (
    email: string,
    password: string,
    role: UserRole
  ) => { success: boolean; message: string };

  register: (
    userData: Omit<User, "id">
  ) => { success: boolean; message: string };

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
