import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, sort_order")
    .order("sort_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const { name, sort_order } = await req.json();

  const { data, error } = await supabase
    .from("categories")
    .insert({ name, sort_order })
    .select("id, name, sort_order")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
