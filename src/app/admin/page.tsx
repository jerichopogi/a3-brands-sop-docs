"use client";

import { useSOPs } from "@/contexts/SOPContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const { sops, deleteSOP, categories } = useSOPs();
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("");

  const filtered = filterCat
    ? sops.filter((s) => s.category_name === filterCat)
    : sops;

  const handleDelete = async (id: string) => {
    await deleteSOP(id);
    setDeleteConfirm(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage SOPs</h1>
          <p className="text-[var(--a3-text-muted)] mt-1">
            Create, edit, delete, and categorize standard operating procedures
          </p>
        </div>
        <Link
          href="/admin/edit/new"
          className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New SOP
        </Link>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-[var(--a3-text-muted)]">Filter:</span>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#4CAF50]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-[var(--a3-text-muted)] ml-auto">
          {filtered.length} SOP{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* SOP Table */}
      <div className="bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--a3-border)]">
              <th className="text-left text-xs font-semibold text-[var(--a3-text-muted)] uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-semibold text-[var(--a3-text-muted)] uppercase tracking-wider px-6 py-3">Category</th>
              <th className="text-left text-xs font-semibold text-[var(--a3-text-muted)] uppercase tracking-wider px-6 py-3">Version</th>
              <th className="text-left text-xs font-semibold text-[var(--a3-text-muted)] uppercase tracking-wider px-6 py-3">Updated</th>
              <th className="text-right text-xs font-semibold text-[var(--a3-text-muted)] uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sop) => (
              <tr key={sop.id} className="border-b border-[var(--a3-border)] last:border-b-0 hover:bg-[var(--a3-bg-card)] transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/sops/${sop.slug}`} className="text-sm font-medium hover:text-[#4CAF50] transition-colors">{sop.title}</Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-[#4CAF50]/10 text-[#4CAF50] px-2 py-0.5 rounded-full">{sop.category_name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-[var(--a3-text-muted)] font-mono">v{sop.version}</td>
                <td className="px-6 py-4 text-sm text-[var(--a3-text-muted)]">{sop.last_updated}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => router.push(`/admin/edit/${sop.id}`)}
                      className="text-xs bg-[var(--a3-bg-card)] border border-[var(--a3-border)] rounded-lg px-3 py-1.5 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors"
                    >
                      Edit
                    </button>
                    {deleteConfirm === sop.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(sop.id)}
                          className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-3 py-1.5 hover:bg-red-500/20 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs bg-[var(--a3-bg-card)] border border-[var(--a3-border)] rounded-lg px-3 py-1.5 hover:border-[var(--a3-text-muted)] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(sop.id)}
                        className="text-xs bg-[var(--a3-bg-card)] border border-[var(--a3-border)] rounded-lg px-3 py-1.5 hover:border-red-500 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
