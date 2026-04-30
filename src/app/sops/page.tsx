"use client";

import { useState } from "react";
import { useSOPs } from "@/contexts/SOPContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useToast } from "@/contexts/ToastContext";
import { NON_SUPERUSER_ROLES, ROLE_LABELS, type UserRole } from "@/lib/roles";

function SOPListContent() {
  const { sops, categories, isLoading, deleteSOP } = useSOPs();
  const { isSuperuser } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFilter = searchParams.get("category") || "";
  const roleViewParam = searchParams.get("as") || "";
  const roleView: UserRole | "" =
    isSuperuser && (NON_SUPERUSER_ROLES as readonly string[]).includes(roleViewParam)
      ? (roleViewParam as UserRole)
      : "";
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  // SUPERUSER receives every SOP from the API. When they pick "View as", apply
  // the same visibility rule the API would enforce for that role.
  const roleScopedSops = roleView
    ? sops.filter((s) => s.role_visibility?.includes(roleView))
    : sops;

  // Only surface categories that contain at least one SOP visible in the current scope.
  const visibleCategoryNames = new Set(roleScopedSops.map((s) => s.category_name));
  const availableCategories = categories.filter((c) => visibleCategoryNames.has(c.name));

  const filtered = roleScopedSops.filter(
    (sop) => !categoryFilter || sop.category_name === categoryFilter
  );

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `/sops?${qs}` : "/sops");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParam("category", e.target.value);
  };

  const handleRoleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Clear category when switching role scope so a now-hidden category isn't sticky.
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    if (value) {
      params.set("as", value);
    } else {
      params.delete("as");
    }
    const qs = params.toString();
    router.replace(qs ? `/sops?${qs}` : "/sops");
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setDeleteError(false);
    const success = await deleteSOP(id);
    setDeleting(false);
    if (success) {
      setDeleteConfirmId(null);
      toast("SOP deleted successfully.");
    } else {
      setDeleteError(true);
      toast("Failed to delete SOP.", "error");
    }
  };

  // Group filtered SOPs by category
  const groupedByCategory = categories
    .map((cat) => ({
      ...cat,
      sops: filtered.filter((s) => s.category_name === cat.name),
    }))
    .filter((group) => group.sops.length > 0);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-[var(--border)] rounded-lg w-1/3 mx-auto animate-pulse" />
        <div className="h-10 bg-[var(--border)] rounded-lg w-64 mx-auto animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-pulse">
              <div className="h-5 bg-[var(--border)] rounded w-2/3 mb-2" />
              <div className="h-4 bg-[var(--tag-bg)] rounded w-full mb-1" />
              <div className="h-4 bg-[var(--tag-bg)] rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--text)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {categoryFilter ? categoryFilter : "Knowledge Base"}
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          {categoryFilter
            ? `All documentation in "${categoryFilter}"`
            : "Standard Operating Procedures & Documentation"}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {isSuperuser && (
          <div className="relative w-full max-w-xs">
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1 ml-1">View as role</label>
            <div className="relative">
              <select
                value={roleView}
                onChange={handleRoleViewChange}
                className="w-full appearance-none bg-[var(--bg-card)] border border-[var(--border)] rounded-xl pl-4 pr-10 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors cursor-pointer"
              >
                <option value="">All roles (admin view)</option>
                {NON_SUPERUSER_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
        <div className="relative w-full max-w-xs">
          {isSuperuser && <label className="block text-xs font-medium text-[var(--text-muted)] mb-1 ml-1">Category</label>}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full appearance-none bg-[var(--bg-card)] border border-[var(--border)] rounded-xl pl-4 pr-10 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors cursor-pointer"
            >
              <option value="">All categories</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {isSuperuser && roleView && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] bg-[var(--tag-bg)] border border-[var(--border)] rounded-full px-3 py-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Showing what <strong>{ROLE_LABELS[roleView]}</strong> sees ({roleScopedSops.length} {roleScopedSops.length === 1 ? "doc" : "docs"})</span>
            <button
              onClick={() => updateParam("as", "")}
              className="text-[var(--primary)] hover:underline ml-1"
            >
              clear
            </button>
          </div>
        </div>
      )}

      {/* Empty state — no SOPs at all in current scope */}
      {roleScopedSops.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-1">No documents</h2>
          <p className="text-sm text-[var(--text-muted)]">
            {roleView
              ? `${ROLE_LABELS[roleView]} doesn't have any SOPs assigned yet.`
              : "SOPs will appear here once they are created and assigned to your role."}
          </p>
        </div>
      )}

      {/* Filter with no results */}
      {filtered.length === 0 && categoryFilter && roleScopedSops.length > 0 && (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-1">No results found</h2>
          <p className="text-sm text-[var(--text-muted)]">Try a different category.</p>
        </div>
      )}

      {/* Grouped SOP Cards (3-column grid) */}
      {filtered.length > 0 && (
        <div className="space-y-10">
          {groupedByCategory.map((group) => (
            <div key={group.id}>
              {!categoryFilter && (
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider">{group.name}</h2>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-xs text-[var(--text-muted)]">
                    {group.sops.length} {group.sops.length === 1 ? "doc" : "docs"}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.sops.map((sop) => (
                  <div
                    key={sop.id}
                    className="relative flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)] hover:shadow-sm transition-all"
                  >
                    {isSuperuser && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                        <button
                          onClick={() => router.push(`/admin/edit/${sop.id}`)}
                          title="Edit SOP"
                          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(sop.id)}
                          title="Delete SOP"
                          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--danger-light)] rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <Link href={`/sops/${sop.slug}`} className="flex flex-col flex-1 group/link">
                      <h3 className={`text-base font-semibold text-[var(--text)] group-hover/link:text-[var(--primary)] transition-colors ${isSuperuser ? "pr-16" : ""}`}>
                        {sop.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-3">{sop.description}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-3 border-t border-[var(--border)]">
                        {sop.steps.length > 0 && (
                          <span className="text-xs text-[var(--text-muted)]">{sop.steps.length} sections</span>
                        )}
                        <span className="text-xs text-[var(--text-muted)]">v{sop.version}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {sop.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs bg-[var(--tag-bg)] text-[var(--text-muted)] px-2 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-[var(--modal-overlay)]" onClick={() => !deleting && setDeleteConfirmId(null)} />
          <div className="relative bg-[var(--bg-card)] rounded-xl shadow-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Delete SOP</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Are you sure you want to delete <strong>&ldquo;{sops.find((s) => s.id === deleteConfirmId)?.title}&rdquo;</strong>? This action cannot be undone.
            </p>
            {deleteError && (
              <p className="text-sm text-[var(--danger-text)] bg-[var(--danger-light)] border border-[var(--danger)] rounded-lg px-3 py-2 mb-4">Failed to delete SOP. Please try again.</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--danger)] hover:bg-[var(--danger-hover)] disabled:opacity-50 rounded-lg transition-colors"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function SOPListPage() {
  return (
    <Suspense>
      <SOPListContent />
    </Suspense>
  );
}
