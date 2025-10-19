// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "Sobre Nós" }, 
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha o menu ao trocar de rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // acompanha mudanças de hash (para ativar "Sobre Nós" quando #sobre-nos estiver ativo)
  useEffect(() => {
    const update = () => setHash(window.location.hash || "");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // regra de "ativo" que considera âncoras na Home
  const isActive = (href: string) => {
    const hasAnchor = href.includes("#");
    if (!hasAnchor) {
      return pathname === href;
    }
    // ex.: "/#sobre-nos" → ativo quando estou na "/" e hash === "#sobre-nos"
    const [base, anchor] = href.split("#");
    return pathname === (base || "/") && hash === `#${anchor}`;
  };

  const itemClass = (href: string) =>
    isActive(href)
      ? "text-primary font-semibold"
      : "text-text-main hover:text-primary";

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-white/85 backdrop-blur",
        scrolled ? "shadow-sm" : "border-b border-black/5",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md"
        >
          VET <span className="text-text-main">Dev</span>
        </Link>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${itemClass(
                item.href
              )} transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="bg-accent text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-[opacity,transform] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.98]"
          >
            Contato
          </Link>
        </div>

        {/* mobile button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          aria-label="Abrir menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-black/5 bg-white ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${itemClass(
                item.href
              )} py-2 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mt-2 bg-accent text-white text-center font-semibold px-4 py-2 rounded-xl shadow-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Contato
          </Link>
        </div>
      </div>
    </header>
  );
}
