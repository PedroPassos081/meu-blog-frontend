// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import WhatsAppFab from "@/components/WhatsAppFab";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Header />
        {children}
        <WhatsAppFab
          phone="5581989714251"
          message="Olá! Quero agendar uma consulta 🐶"
        />
        <Footer />
      </body>
    </html>
  );
}
