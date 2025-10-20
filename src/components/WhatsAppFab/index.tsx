"use client";

import { usePathname } from "next/navigation";

type Props = {
  phone: string;
  message?: string; 
  hideOnPaths?: string[];
};

export default function WhatsAppFab({
  phone,
  message = "Olá! Gostaria de agendar uma consulta para meu pet 🐾",
  hideOnPaths = ["/contato"],
}: Props) {
  const pathname = usePathname();
  if (hideOnPaths.includes(pathname)) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="
        fixed z-50
        bottom-[max(theme(spacing.6),env(safe-area-inset-bottom))]
        right-[max(theme(spacing.6),env(safe-area-inset-right))]
      "
    >
      {/* tooltip */}
      <div className="pointer-events-none mb-2 w-max translate-y-1 opacity-0 transition-all duration-300 ease-out sm:group-hover/fab:translate-y-0 sm:group-hover/fab:opacity-100">
        <span className="rounded-full bg-primary/90 px-3 py-1 text-xs text-white shadow">
          Falar no WhatsApp
        </span>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp"
        className="
          group/fab inline-flex h-14 w-14 items-center justify-center
          rounded-full bg-accent text-white shadow-lg ring-1 ring-black/5
          transition
          hover:shadow-xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
        "
      >
        {/* ícone WhatsApp (SVG) */}
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" fill="currentColor">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12.01 0C5.4 0 .03 5.37.03 11.99a11.9 11.9 0 0 0 1.64 6.04L0 24l6.17-1.62a12 12 0 0 0 5.84 1.49h.01c6.6 0 11.98-5.37 11.98-11.99a11.9 11.9 0 0 0-3.48-8.4ZM12 21.3c-1.93 0-3.73-.52-5.3-1.51l-.38-.23-3.66.96.98-3.56-.25-.37A9.3 9.3 0 0 1 2.7 12C2.7 6.97 6.98 2.7 12 2.7c2.49 0 4.82.97 6.58 2.74A9.28 9.28 0 0 1 21.3 12c0 5.03-4.28 9.3-9.3 9.3Zm5.37-6.98c-.29-.14-1.7-.84-1.97-.94-.27-.1-.47-.14-.66.14-.19.28-.76.94-.93 1.12-.17.18-.34.2-.61.07-.28-.14-1.22-.46-2.31-1.43-.85-.76-1.43-1.7-1.6-1.98-.17-.29-.02-.44.13-.58.13-.13.3-.34.45-.51.15-.18.2-.3.29-.5.09-.2.05-.37-.02-.52-.07-.14-.58-1.4-.79-1.9-.21-.5-.42-.44-.58-.45h-.49c-.17 0-.51.08-.78.36-.27.28-1.03 1-1.03 2.42 0 1.42 1.05 2.8 1.2 3 .15.2 2.07 3.18 5.04 4.45.7.3 1.25.48 1.67.62.71.22 1.35.19 1.85.12.56-.09 1.71-.69 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.13-.26-.2-.55-.35Z"/>
        </svg>
      </a>
    </div>
  );
}
