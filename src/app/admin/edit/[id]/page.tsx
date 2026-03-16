"use client";

import { useSOPs } from "@/contexts/SOPContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { SOPStep } from "@/types/database";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="h-[150px] bg-[var(--a3-bg)] border border-[var(--a3-border)] rounded-lg animate-pulse" />,
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyStep: SOPStep = {
  title: "",
  description: "",
  substeps: [""],
  notes: [],
  warning: "",
  codeExample: "",
  richContent: "",
};

export default function EditSOPPage() {
  const params = useParams();
  const router = useRouter();
  const { sops, addSOP, updateSOP, categories, addCategory } = useSOPs();
  const isNew = params.id === "new";
  const existing = !isNew ? sops.find((s) => s.id === params.id) : undefined;

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("1.0");
  const [tags, setTags] = useState("");
  const [steps, setSteps] = useState<SOPStep[]>([{ ...emptyStep, substeps: [""] }]);
  const [saving, setSaving] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setCategoryId(existing.category_id);
      setDescription(existing.description);
      setVersion(existing.version);
      setTags(existing.tags.join(", "));
      setSteps(existing.steps.map((s) => ({ ...s, substeps: s.substeps || [""], richContent: s.richContent || "" })));
      setExpandedSteps(new Set([0]));
    }
  }, [existing]);

  const updateStep = (index: number, field: keyof SOPStep, value: string | string[]) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addStep = () => {
    const newIndex = steps.length;
    setSteps((prev) => [...prev, { ...emptyStep, substeps: [""] }]);
    setExpandedSteps((prev) => new Set([...prev, newIndex]));
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const updateSubstep = (stepIndex: number, subIndex: number, value: string) => {
    setSteps((prev) =>
      prev.map((s, i) => {
        if (i !== stepIndex) return s;
        const subs = [...(s.substeps || [])];
        subs[subIndex] = value;
        return { ...s, substeps: subs };
      })
    );
  };

  const addSubstep = (stepIndex: number) => {
    setSteps((prev) =>
      prev.map((s, i) => {
        if (i !== stepIndex) return s;
        return { ...s, substeps: [...(s.substeps || []), ""] };
      })
    );
  };

  const removeSubstep = (stepIndex: number, subIndex: number) => {
    setSteps((prev) =>
      prev.map((s, i) => {
        if (i !== stepIndex) return s;
        return { ...s, substeps: (s.substeps || []).filter((_, j) => j !== subIndex) };
      })
    );
  };

  const handleSave = async () => {
    setSaving(true);
    let finalCategoryId = categoryId;

    if (newCategory) {
      const created = await addCategory(newCategory);
      finalCategoryId = created?.id || categoryId;
    }

    const cleanedSteps = steps.map((s) => ({
      ...s,
      substeps: (s.substeps || []).filter((sub) => sub.trim()),
      notes: (s.notes || []).filter((n) => n.trim()),
      warning: s.warning || undefined,
      codeExample: s.codeExample || undefined,
      richContent: s.richContent || undefined,
    }));

    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (isNew) {
      await addSOP({
        slug: generateSlug(title),
        title,
        category_id: finalCategoryId,
        description,
        version,
        tags: tagsArray,
        steps: cleanedSteps,
      });
    } else {
      await updateSOP(params.id as string, {
        title,
        category_id: finalCategoryId,
        description,
        version,
        tags: tagsArray,
        steps: cleanedSteps,
      });
    }
    router.push("/admin");
  };

  const inputClass =
    "w-full bg-[var(--a3-bg)] border border-[var(--a3-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-colors";
  const labelClass = "block text-sm font-medium text-[var(--a3-text-muted)] mb-1.5";

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <nav className="flex items-center gap-2 text-sm text-[var(--a3-text-muted)] mb-2">
            <Link href="/admin" className="hover:text-[#4CAF50]">Admin</Link>
            <span>/</span>
            <span className="text-[var(--a3-text)]">{isNew ? "New SOP" : "Edit SOP"}</span>
          </nav>
          <h1 className="text-3xl font-bold">{isNew ? "Create New SOP" : "Edit SOP"}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => router.push("/admin")} className="bg-[var(--a3-bg-card)] border border-[var(--a3-border)] text-sm rounded-lg px-4 py-2.5 hover:border-[var(--a3-text-muted)] transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="bg-[#4CAF50] hover:bg-[#388E3C] disabled:opacity-50 text-white font-medium text-sm rounded-lg px-4 py-2.5 transition-colors">
            {saving ? "Saving..." : isNew ? "Create SOP" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="SOP title" />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputClass}>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Or create new category</label>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className={inputClass} placeholder="New category name" />
            </div>
            <div>
              <label className={labelClass}>Version</label>
              <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className={inputClass} placeholder="1.0" />
            </div>
            <div>
              <label className={labelClass}>Tags (comma-separated)</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} placeholder="tag1, tag2, tag3" />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} min-h-[80px]`} placeholder="Brief description of this SOP" />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Steps</h2>
            <button onClick={addStep} className="text-xs bg-[#4CAF50]/10 text-[#4CAF50] rounded-lg px-3 py-1.5 hover:bg-[#4CAF50]/20 transition-colors">+ Add Step</button>
          </div>

          {steps.map((step, i) => {
            const isExpanded = expandedSteps.has(i);
            return (
              <div key={i} className="bg-[var(--a3-bg-secondary)] border border-[var(--a3-border)] rounded-xl overflow-hidden">
                {/* Step header — collapsible */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--a3-bg-card)] transition-colors"
                  onClick={() => toggleStep(i)}
                >
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#4CAF50]/10 text-[#4CAF50] flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="text-sm">{step.title || `Step ${i + 1}`}</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    {steps.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeStep(i); }}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1"
                      >
                        Remove
                      </button>
                    )}
                    <svg
                      className={`w-4 h-4 text-[var(--a3-text-muted)] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4 border-t border-[var(--a3-border)]">
                    <div className="pt-4">
                      <label className={labelClass}>Step Title</label>
                      <input type="text" value={step.title} onChange={(e) => updateStep(i, "title", e.target.value)} className={inputClass} placeholder="Step title" />
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea value={step.description} onChange={(e) => updateStep(i, "description", e.target.value)} className={`${inputClass} min-h-[60px]`} placeholder="Step description" />
                    </div>

                    {/* Rich Content Editor */}
                    <div>
                      <label className={labelClass}>
                        Rich Content
                        <span className="text-[var(--a3-text-muted)] font-normal ml-2 text-xs">(screenshots, formatted text, images)</span>
                      </label>
                      <RichTextEditor
                        content={step.richContent || ""}
                        onChange={(html) => updateStep(i, "richContent", html)}
                        placeholder="Add screenshots, formatted text, or images here... You can paste images directly or drag & drop."
                      />
                    </div>

                    {/* Substeps */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={labelClass}>Substeps</label>
                        <button onClick={() => addSubstep(i)} className="text-xs text-[#4CAF50] hover:text-[#81C784]">+ Add</button>
                      </div>
                      {(step.substeps || []).map((sub, j) => (
                        <div key={j} className="flex gap-2 mb-2">
                          <input type="text" value={sub} onChange={(e) => updateSubstep(i, j, e.target.value)} className={`${inputClass} flex-1`} placeholder={`Substep ${j + 1}`} />
                          {(step.substeps || []).length > 1 && (
                            <button onClick={() => removeSubstep(i, j)} className="text-xs text-red-400 hover:text-red-300 px-2">×</button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Warning */}
                    <div>
                      <label className={labelClass}>Warning (optional)</label>
                      <input type="text" value={step.warning || ""} onChange={(e) => updateStep(i, "warning", e.target.value)} className={inputClass} placeholder="Warning message" />
                    </div>

                    {/* Code Example */}
                    <div>
                      <label className={labelClass}>Code Example (optional)</label>
                      <textarea value={step.codeExample || ""} onChange={(e) => updateStep(i, "codeExample", e.target.value)} className={`${inputClass} min-h-[100px] font-mono text-xs`} placeholder="Code example" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={() => router.push("/admin")} className="bg-[var(--a3-bg-card)] border border-[var(--a3-border)] text-sm rounded-lg px-6 py-2.5 hover:border-[var(--a3-text-muted)] transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="bg-[#4CAF50] hover:bg-[#388E3C] disabled:opacity-50 text-white font-medium text-sm rounded-lg px-6 py-2.5 transition-colors">
            {saving ? "Saving..." : isNew ? "Create SOP" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}
