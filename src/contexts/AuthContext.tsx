"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type UserRole = "admin" | "user";

interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Local demo accounts
const LOCAL_USERS: Record<string, { password: string; role: UserRole; displayName: string }> = {
  "admin@a3brands.com": { password: "admin123", role: "admin", displayName: "Admin" },
  "dev@a3brands.com": { password: "dev123", role: "user", displayName: "Developer" },
};

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("a3_local_user");
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Always start with null to avoid SSR/client hydration mismatch
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hydrate from sessionStorage on client only
    const stored = getStoredUser();
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      // Always use local auth for demo credentials
      const account = LOCAL_USERS[email.toLowerCase()];
      if (!account) return "Invalid email. Try admin@a3brands.com or dev@a3brands.com";
      if (account.password !== password) return "Invalid password.";

      const localUser: User = {
        id: email.toLowerCase(),
        email: email.toLowerCase(),
        role: account.role,
        displayName: account.displayName,
      };
      setUser(localUser);
      sessionStorage.setItem("a3_local_user", JSON.stringify(localUser));
      return null;
    },
    []
  );

  const logout = useCallback(async () => {
    setUser(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("a3_local_user");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, isAdmin: user?.role === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
