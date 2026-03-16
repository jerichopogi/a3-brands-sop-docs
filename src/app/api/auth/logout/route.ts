import { NextResponse } from "next/server";
import { sessionCookieOptions } from "@/lib/session";

export async function POST() {
  const { name, ...options } = sessionCookieOptions(0); // maxAge 0 = delete
  const res = NextResponse.json({ success: true });
  res.cookies.set(name, "", options);
  return res;
}
