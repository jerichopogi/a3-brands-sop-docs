import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, decodeSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const value = req.cookies.get(COOKIE_NAME)?.value;
  if (!value) return NextResponse.json({ user: null });

  const user = decodeSession(value);
  return NextResponse.json({ user });
}
