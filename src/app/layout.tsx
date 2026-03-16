import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SOPProvider } from "@/contexts/SOPContext";

export const metadata: Metadata = {
  title: "A3 Brands - Developer SOP Documentation",
  description: "Standard Operating Procedures for A3 Brands development team",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <SOPProvider>{children}</SOPProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
