"use client";

import { useState, useEffect } from "react";
import { useSOPs } from "@/contexts/SOPContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useToast } from "@/contexts/ToastContext";

function SOPListContent() {
  const { sops, categories, isLoading, deleteSOP } = useSOPs();
  const { isSuperuser } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFilter = searchParams.get("category") || "";
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Sync search input when URL q param changes (e.g. from header search)
  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`/sops?${params.toString()}`);
  };

  const filtered = sops.filter((sop) => {
    const matchesCategory = !categoryFilter || sop.category_name === categoryFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      sop.title.toLowerCase().includes(q) ||
      sop.description.toLowerCase().includes(q) ||
      sop.tags.some((t) => t.toLowerCase().includes(q)) ||
      (sop.content_html && sop.content_html.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const [deleteError, setDeleteError] = useState(false);

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
        <div className="h-8 bg-[var(--border)] rounded-lg w-1/3 animate-pulse" />
        <div className="h-10 bg-[var(--border)] rounded-lg w-full animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {categoryFilter ? categoryFilter : "Knowledge Base"}
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          {categoryFilter
            ? `All documentation in "${categoryFilter}"`
            : "Standard Operating Procedures & Documentation"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search SOPs by title, description, or content..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/sops"
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !categoryFilter
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/sops?category=${encodeURIComponent(cat.name)}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === cat.name
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {sops.length === 0 && !search && (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-1">No documents yet</h2>
          <p className="text-sm text-[var(--text-muted)]">SOPs will appear here once they are created and assigned to your role.</p>
        </div>
      )}

      {/* Search with no results */}
      {filtered.length === 0 && (search || categoryFilter) && sops.length > 0 && (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-1">No results found</h2>
          <p className="text-sm text-[var(--text-muted)]">Try adjusting your search or category filter.</p>
        </div>
      )}

      {/* Grouped SOP Cards */}
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
              <div className="space-y-3">
                {group.sops.map((sop) => (
                  <div
                    key={sop.id}
                    className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <Link href={`/sops/${sop.slug}`} className="flex-1 min-w-0 group/link">
                        <h3 className="text-base font-semibold text-[var(--text)] group-hover/link:text-[var(--primary)] transition-colors">
                          {sop.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">{sop.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          {sop.steps.length > 0 && (
                            <span className="text-xs text-[var(--text-muted)]">{sop.steps.length} sections</span>
                          )}
                          <span className="text-xs text-[var(--text-muted)]">v{sop.version}</span>
                          <div className="flex gap-1.5">
                            {sop.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs bg-[var(--tag-bg)] text-[var(--text-muted)] px-2 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center gap-2 ml-4">
                        {isSuperuser && (
                          <>
                            <button
                              onClick={() => router.push(`/admin/edit/${sop.id}`)}
                              title="Edit SOP"
                              className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(sop.id)}
                              title="Delete SOP"
                              className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--danger-light)] rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                        <Link href={`/sops/${sop.slug}`} className="group/arrow">
                          <svg className="w-5 h-5 text-[var(--text-muted)] group-hover/arrow:text-[var(--primary)] transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
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
