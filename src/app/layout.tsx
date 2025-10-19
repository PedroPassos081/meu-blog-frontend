// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VET Dev",
  description: "Clínica veterinária...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <Header />
      <body>{children}</body>
    </html>
  );
}
