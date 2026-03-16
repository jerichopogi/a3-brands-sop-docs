import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createServerClient();
  const { id } = await params;
  const body = await req.json();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("sops")
    .update({ ...body, last_updated: today })
    .eq("id", id)
    .select("*, categories(name)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createServerClient();
  const { id } = await params;

  const { error } = await supabase.from("sops").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
