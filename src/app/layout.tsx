import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeOS — Regrets of a Lifetime",
  description:
    "An anonymous space to share life regrets. Dark, melancholic, cathartic.",
  openGraph: {
    title: "LifeOS — Regrets of a Lifetime",
    description: "An anonymous space to share life regrets.",
    type: "website",
    siteName: "LifeOS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
