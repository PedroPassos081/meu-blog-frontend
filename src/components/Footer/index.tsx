// src/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-primary/5 text-text-main">
      {/* overlay decorativo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-white" />

      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* Coluna 1 — Logo + descrição */}
        <div>
          <Link href="/" className="inline-flex items-center gap-1 text-2xl font-extrabold text-primary">
            <Image
              src="/images/dog-hero.png"
              alt="Logo VET Dev"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span>
              VET <span className="text-text-main">Dev</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-text-main/80">
            Cuidar com ciência e afeto. Nossa missão é oferecer um atendimento
            veterinário moderno, acolhedor e baseado em evidências — para que
            cada pet viva mais e melhor.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-primary hover:text-accent transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm4.88-.63a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75z" />
              </svg>
            </Link>
            <Link href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-primary hover:text-accent transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3h4a1 1 0 0 1 1 1v4h-3a2 2 0 0 0-2 2v3h5l-1 4h-4v7h-4v-7H8v-4h3V9a5 5 0 0 1 5-5z" />
              </svg>
            </Link>
            <Link href="https://wa.me/5581989714251" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-primary hover:text-accent transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.52 13.28c-.27-.13-1.62-.8-1.87-.9-.25-.1-.43-.14-.62.13-.18.27-.71.9-.87 1.08-.16.18-.32.2-.59.07-.27-.13-1.15-.43-2.2-1.36-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.13-.16.17-.27.25-.45.08-.18.04-.34-.02-.48-.06-.13-.55-1.31-.75-1.79-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.66 1.12 2.85.13.18 1.95 3.02 4.73 4.23.66.29 1.17.46 1.57.59.66.21 1.27.18 1.75.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.19-.52-.32zM12.03 2C6.5 2 2 6.49 2 12.03c0 1.9.5 3.73 1.44 5.35L2 22l4.76-1.4a9.9 9.9 0 0 0 5.27 1.46h.01c5.54 0 10.03-4.49 10.03-10.03A10.04 10.04 0 0 0 12.03 2z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Coluna 2 — Navegação */}
        <div>
          <h4 className="text-base font-semibold text-primary">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-text-main/80">
            <li><Link href="/" className="hover:text-primary">Início</Link></li>
            <li><Link href="/#sobre-nos" className="hover:text-primary">Sobre nós</Link></li>
            <li><Link href="/servicos" className="hover:text-primary">Serviços</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link href="/contato" className="hover:text-primary">Contato</Link></li>
          </ul>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <h4 className="text-base font-semibold text-primary">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-text-main/80">
            <li><strong>Telefone:</strong> (81) 9 8971-4251</li>
            <li><strong>WhatsApp:</strong> (81) 9 8971-4251</li>
            <li><strong>E-mail:</strong> pedro.passos081@gmail.com</li>
            <li><strong>Endereço:</strong><br /> Rua Exemplo, 123 — Recife/PE</li>
            <li><strong>Horário:</strong><br /> Seg–Sex 8h–18h | Sáb 8h–12h</li>
          </ul>
        </div>

        {/* Coluna 4 — Newsletter */}
        <div>
          <h4 className="text-base font-semibold text-primary">Receba novidades</h4>
          <p className="mt-3 text-sm text-text-main/80">
            Fique por dentro de campanhas, dicas de cuidado e eventos da VET Dev.
          </p>

          <form className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </div>

      {/* barra inferior */}
      <div className="border-t border-black/10 bg-white/50 backdrop-blur py-4 text-center text-xs text-text-main/60">
        © {new Date().getFullYear()} VET Dev  Todos os direitos reservados. | Desenvolvido com ❤️ por <span className="text-primary font-medium">Pedro Passos</span>
      </div>
    </footer>
  );
}
