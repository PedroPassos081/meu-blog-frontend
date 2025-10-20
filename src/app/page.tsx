// ARQUIVO: src/app/layout.tsx

import type { Metadata } from "next";

import "./globals.css";

import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Contact from "./contact/page";
import BlogPage from "./blog/page";

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
      <Hero />
      <Services />
      {children}
      <About id="about"/>
      <BlogPage />
      <Contact />
      
    </>
  );
}
