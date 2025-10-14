// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
// opcional: fonte
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
      {/* <body className={inter.className}> */}
      <body>{children}</body>
    </html>
  );
}
