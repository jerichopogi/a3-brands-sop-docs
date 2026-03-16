import { NextRequest, NextResponse } from "next/server";
import { encodeSession, sessionCookieOptions } from "@/lib/session";
import type { UserRole } from "@/contexts/AuthContext";

const USERS: Record<string, { password: string; role: UserRole; displayName: string }> = {
  "admin@a3brands.com": { password: "admin123", role: "admin", displayName: "Admin" },
  "dev@a3brands.com":   { password: "dev123",   role: "user",  displayName: "Developer" },
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const account = USERS[email?.toLowerCase()];

  if (!account) {
    return NextResponse.json({ error: "Invalid email." }, { status: 401 });
  }
  if (account.password !== password) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const user = {
    id: email.toLowerCase(),
    email: email.toLowerCase(),
    role: account.role,
    displayName: account.displayName,
  };

  const { name, ...options } = sessionCookieOptions();
  const res = NextResponse.json({ user });
  res.cookies.set(name, encodeSession(user), options);
  return res;
}
