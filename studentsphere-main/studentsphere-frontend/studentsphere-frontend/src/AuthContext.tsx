import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type User, type UserRole } from "./context";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("studentsphere_current_user");

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("studentsphere_users");

    if (!savedUsers) return [];

    try {
      return JSON.parse(savedUsers);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "studentsphere_users",
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "studentsphere_current_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("studentsphere_current_user");
    }
  }, [user]);

  const login = (
    email: string,
    password: string,
    role: UserRole
  ) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (existingUser) =>
        existingUser.email.toLowerCase() === normalizedEmail &&
        existingUser.password === password &&
        existingUser.role === role
    );

    if (!foundUser) {
      return {
        success: false,
        message:
          "Invalid email, password or account type.",
      };
    }

    setUser(foundUser);

    return {
      success: true,
      message: "Login successful",
    };
  };

  const register = (userData: Omit<User, "id">) => {
    const normalizedEmail = userData.email
      .trim()
      .toLowerCase();

    const emailExists = users.some(
      (existingUser) =>
        existingUser.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      email: normalizedEmail,
    };

    setUsers((previousUsers) => [
      ...previousUsers,
      newUser,
    ]);

    setUser(newUser);

    return {
      success: true,
      message: "Account created successfully",
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export type { User, UserRole };
