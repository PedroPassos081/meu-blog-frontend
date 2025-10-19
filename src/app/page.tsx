// ARQUIVO: src/app/layout.tsx

import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";

export const metadata: Metadata = {
  title: "VET Dev",
  description: "Portfólio de Desenvolvedor Full-Stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      {children}
    </>
  );
}
