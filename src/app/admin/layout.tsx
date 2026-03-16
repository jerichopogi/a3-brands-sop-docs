"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      } else if (!isAdmin) {
        router.replace("/sops");
      }
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--a3-bg)]">
        <div className="text-[var(--a3-text-muted)] text-sm">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[280px] min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
