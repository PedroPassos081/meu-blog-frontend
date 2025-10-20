// src/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative
        bg-surface
        overflow-hidden
      "
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Coluna texto */}
          <div>
            {/* badge topo */}
            <div className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-primary shadow-sm ring-1 ring-black/5">
              Atendimento humano e científico
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              Cuidar do seu pet é nossa especialidade
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-main md:text-lg">
              Consultas, vacinas, exames e acompanhamento completo. Equipe
              experiente com foco em bem-estar, prevenção e uma experiência
              acolhedora para tutores e pets.
            </p>

            {/* bullets rápidos */}
            <ul className="mt-6 grid gap-3 text-sm text-text-main/90 md:text-base">
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 text-accent" />
                <span>Clínica geral, especialidades e emergência</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 text-accent" />
                <span>Laboratório e diagnóstico por imagem</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 text-accent" />
                <span>Planos de saúde e check-ups preventivos</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-accent text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Agendar consulta
              </Link>
              <Link
                href="/servicos"
                className="px-5 py-3 rounded-xl font-semibold text-primary ring-1 ring-primary/20 bg-white hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Ver serviços
              </Link>
            </div>

            {/* selo de confiança */}
            <div className="mt-6 flex items-center gap-4 text-xs text-text-main/70">
              <ShieldIcon className="h-5 w-5 text-primary" />
              <span>+5.000 pets atendidos • 4.9★ no Google • Equipe 24h</span>
            </div>
          </div>

          {/* Coluna imagem */}
          <div className="relative">
            {/* blob atrás da imagem */}
            <div
              aria-hidden
              className="
                absolute -left-6 -top-6 h-[420px] w-[420px] md:h-[520px] md:w-[520px]
                rounded-[48%_52%_46%_54%/_60%_40%_60%_40%]
                bg-white shadow-lg ring-1 ring-black/5
              "
            />
            <div className="relative w-full max-w-[560px] h-[340px] md:h-[420px] lg:h-[520px]">
              <Image
                src="/images/dog-hero.png"
                alt="Cachorro em consulta na clínica"
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 480px, 90vw"
                className="object-contain rounded-[28px] "
                priority
              />
            </div>

            {/* enfeites */}
            <DotGroup className="absolute right-2 top-4 hidden h-20 w-20 text-accent md:block" />
            <Squiggle className="absolute -bottom-4 left-6 hidden h-20 w-16 text-accent md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Ícones inline (sem libs externas) --- */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function DotGroup(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      {Array.from({ length: 25 }).map((_, i) => {
        const x = (i % 5) * 20 + 2;
        const y = Math.floor(i / 5) * 20 + 2;
        return <circle key={i} cx={x} cy={y} r="2.5" />;
      })}
    </svg>
  );
}
function Squiggle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 24" fill="none" {...props}>
      <path
        d="M2 12c6-8 12 8 18 0s12 8 18 0 12 8 18 0 12 8 18 0 12 8 18 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
