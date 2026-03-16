"use client";

import { useState } from "react";
import { useSOPs } from "@/contexts/SOPContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SOPListContent() {
  const { sops, categories } = useSOPs();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const [search, setSearch] = useState("");

  const filtered = sops.filter((sop) => {
    const matchesCategory = !categoryFilter || sop.category_name === categoryFilter;
    const matchesSearch =
      !search ||
      sop.title.toLowerCase().includes(search.toLowerCase()) ||
      sop.description.toLowerCase().includes(search.toLowerCase()) ||
      sop.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Group filtered SOPs by category
  const groupedByCategory = categories
    .map((cat) => ({
      ...cat,
      sops: filtered.filter((s) => s.category_name === cat.name),
    }))
    .filter((group) => group.sops.length > 0);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryFilter ? categoryFilter : "Standard Operating Procedures"}
        </h1>
        <p className="text-[var(--a3-text-muted)]">
          {categoryFilter
            ? `All documentation in the "${categoryFilter}" section`
            : "Complete developer documentation for MLP & City Page development"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--a3-text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="w-full bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/sops"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            !categoryFilter
              ? "bg-[#4CAF50] text-white"
              : "bg-[var(--a3-bg-card)] text-[var(--a3-text-muted)] hover:text-[var(--a3-text)]"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/sops?category=${encodeURIComponent(cat.name)}`}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === cat.name
                ? "bg-[#4CAF50] text-white"
                : "bg-[var(--a3-bg-card)] text-[var(--a3-text-muted)] hover:text-[var(--a3-text)]"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Grouped SOP Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[var(--a3-text-muted)]">
          <p className="text-lg">No documentation found</p>
          <p className="text-sm mt-1">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="space-y-10">
          {groupedByCategory.map((group) => (
            <div key={group.id}>
              {!categoryFilter && (
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-[var(--a3-text)]">{group.name}</h2>
                  <div className="flex-1 h-px bg-[var(--a3-border)]" />
                  <span className="text-xs text-[var(--a3-text-muted)]">
                    {group.sops.length} {group.sops.length === 1 ? "page" : "pages"}
                  </span>
                </div>
              )}
              <div className="space-y-3">
                {group.sops.map((sop) => (
                  <Link
                    key={sop.id}
                    href={`/sops/${sop.slug}`}
                    className="block bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-xl p-5 hover:border-[#4CAF50]/50 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold group-hover:text-[#4CAF50] transition-colors">
                          {sop.title}
                        </h3>
                        <p className="text-sm text-[var(--a3-text-muted)] mt-1 line-clamp-2">{sop.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-[var(--a3-text-muted)]">{sop.steps.length} sections</span>
                          <span className="text-xs text-[var(--a3-text-muted)]">&middot;</span>
                          <span className="text-xs text-[var(--a3-text-muted)]">v{sop.version}</span>
                          <span className="text-xs text-[var(--a3-text-muted)]">&middot;</span>
                          <div className="flex gap-1.5">
                            {sop.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs bg-[var(--a3-bg-card)] text-[var(--a3-text-muted)] px-2 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-[var(--a3-text-muted)] group-hover:text-[#4CAF50] transition-colors flex-shrink-0 mt-1 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
