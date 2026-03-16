"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useSOPs } from "@/contexts/SOPContext";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const { categories, sops } = useSOPs();
  const pathname = usePathname();

  const sopsByCategory = (catName: string) =>
    sops.filter((s) => s.category_name === catName);

  const isActive = (slug: string) => pathname === `/sops/${slug}`;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-[var(--a3-bg-secondary)] border-r border-[var(--a3-border)] flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--a3-border)]">
        <Link href="/sops">
          <Logo size="sm" />
        </Link>
        <p className="text-xs text-[var(--a3-text-muted)] mt-2 font-mono">Developer Documentation</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 sidebar-scroll">
        {categories.map((cat) => {
          const catSOPs = sopsByCategory(cat.name);
          if (catSOPs.length === 0) return null;
          return (
            <div key={cat.id} className="mb-1">
              <h3 className="text-[11px] font-semibold text-[var(--a3-text-muted)] uppercase tracking-wider px-5 py-2 mt-2 first:mt-0">
                {cat.name}
              </h3>
              <div className="space-y-0.5 px-2">
                {catSOPs.map((sop) => (
                  <Link
                    key={sop.id}
                    href={`/sops/${sop.slug}`}
                    className={`block px-3 py-1.5 rounded-md text-[13px] leading-snug transition-colors ${
                      isActive(sop.slug)
                        ? "bg-[#4CAF50]/10 text-[#4CAF50] font-medium"
                        : "text-[var(--a3-text-muted)] hover:text-[var(--a3-text)] hover:bg-[var(--a3-bg-card)]"
                    }`}
                  >
                    {sop.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {isAdmin && (
          <div className="mb-1 mt-2 pt-3 mx-4 border-t border-[var(--a3-border)]">
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith("/admin")
                  ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                  : "text-[var(--a3-text-muted)] hover:text-[var(--a3-text)] hover:bg-[var(--a3-bg-card)]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Manage SOPs
            </Link>
          </div>
        )}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-[var(--a3-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] text-sm font-semibold">
              {user?.displayName?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.displayName}</p>
              <p className="text-xs text-[var(--a3-text-muted)] capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="text-[var(--a3-text-muted)] hover:text-red-400 transition-colors"
            title="Logout"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
