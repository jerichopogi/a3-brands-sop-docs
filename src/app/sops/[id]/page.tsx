"use client";

import { useSOPs } from "@/contexts/SOPContext";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SOPDetailPage() {
  const { getSOP, isLoading } = useSOPs();
  const params = useParams();
  const router = useRouter();
  const sop = getSOP(params.id as string);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[var(--a3-bg-card)] rounded w-2/3" />
        <div className="h-4 bg-[var(--a3-bg-card)] rounded w-full" />
        <div className="h-4 bg-[var(--a3-bg-card)] rounded w-3/4" />
      </div>
    );
  }

  if (!sop) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-2">SOP Not Found</h1>
        <p className="text-[var(--a3-text-muted)] mb-4">The requested SOP does not exist.</p>
        <Link href="/sops" className="text-[#4CAF50] hover:underline text-sm">&larr; Back to all SOPs</Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--a3-text-muted)] mb-6">
        <Link href="/sops" className="hover:text-[#4CAF50] transition-colors">SOPs</Link>
        <span>/</span>
        <span className="hover:text-[#4CAF50] transition-colors cursor-pointer" onClick={() => router.push(`/sops?category=${encodeURIComponent(sop.category_name)}`)}>
          {sop.category_name}
        </span>
        <span>/</span>
        <span className="text-[var(--a3-text)]">{sop.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[var(--a3-border)]">
        <h1 className="text-3xl font-bold mb-3">{sop.title}</h1>
        <p className="text-[var(--a3-text-muted)] mb-4">{sop.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full font-medium">{sop.category_name}</span>
          <span className="text-xs text-[var(--a3-text-muted)] font-mono">v{sop.version}</span>
          <span className="text-xs text-[var(--a3-text-muted)]">Last updated: {sop.last_updated}</span>
        </div>
        <div className="flex gap-2 mt-3">
          {sop.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[var(--a3-bg-card)] text-[var(--a3-text-muted)] px-2 py-0.5 rounded border border-[var(--a3-border)]">{tag}</span>
          ))}
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--a3-text-muted)] mb-3">On this page</h2>
        <ol className="space-y-1.5">
          {sop.steps.map((step, i) => (
            <li key={i}>
              <a href={`#step-${i}`} className="text-sm text-[var(--a3-text-muted)] hover:text-[#4CAF50] transition-colors flex items-center gap-2">
                <span className="font-mono text-xs text-[#4CAF50]">{i + 1}</span>
                {step.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Steps */}
      <div className="space-y-10">
        {sop.steps.map((step, i) => (
          <section key={i} id={`step-${i}`} className="scroll-mt-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#4CAF50]/10 text-[#4CAF50] flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <h2 className="text-xl font-bold">{step.title}</h2>
            </div>
            <p className="text-[var(--a3-text-muted)] mb-4 leading-relaxed">{step.description}</p>

            {step.richContent && (
              <div
                className="rich-content mb-4"
                dangerouslySetInnerHTML={{ __html: step.richContent }}
              />
            )}

            {step.warning && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 mb-4 flex gap-3">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-400">Warning</p>
                  <p className="text-sm text-amber-300/80 mt-0.5">{step.warning}</p>
                </div>
              </div>
            )}

            {step.substeps && (
              <div className="space-y-2 mb-4">
                {step.substeps.map((sub, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded border border-[var(--a3-border)] bg-[var(--a3-bg-card)] flex items-center justify-center mt-0.5">
                      <span className="text-[10px] text-[var(--a3-text-muted)] font-mono">{j + 1}</span>
                    </div>
                    <p className="text-sm text-[var(--a3-text-muted)] leading-relaxed">{sub}</p>
                  </div>
                ))}
              </div>
            )}

            {step.codeExample && (
              <div className="mb-4">
                <div className="flex items-center justify-between bg-[#1e1e2e] border border-[var(--a3-border)] rounded-t-lg px-4 py-2">
                  <span className="text-xs text-[var(--a3-text-muted)] font-mono">Example</span>
                  <button onClick={() => navigator.clipboard.writeText(step.codeExample!)} className="text-xs text-[var(--a3-text-muted)] hover:text-[#4CAF50] transition-colors">Copy</button>
                </div>
                <pre className="bg-[#1e1e2e] border border-t-0 border-[var(--a3-border)] rounded-b-lg p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-[#d4d4d4] leading-relaxed whitespace-pre">{step.codeExample}</code>
                </pre>
              </div>
            )}

            {step.notes && step.notes.length > 0 && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg px-4 py-3">
                <p className="text-xs font-medium text-blue-400 mb-2 uppercase tracking-wider">Notes</p>
                {step.notes.map((note, k) => (
                  <p key={k} className="text-sm text-blue-300/70 leading-relaxed mb-1 last:mb-0">&bull; {note}</p>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-[var(--a3-border)] flex justify-between">
        <Link href="/sops" className="text-sm text-[var(--a3-text-muted)] hover:text-[#4CAF50] transition-colors">&larr; Back to all SOPs</Link>
      </div>
    </>
  );
}
