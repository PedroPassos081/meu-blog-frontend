// src/sections/About/index.tsx
import Image from "next/image";
import Link from "next/link";

type Stat = { label: string; value: string };
type Feature = { title: string; desc: string };
type CTA = { href: string; label: string; variant?: "primary" | "outline" };

type Props = {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  intro?: string;
  bullets?: string[];
  features?: Feature[];
  stats?: Stat[];
  ctas?: CTA[];
};

export default function About({
  id = "sobre-nos",
  imageSrc = "/images/vet.jpg",
  imageAlt = "Veterinária cuidando de um cachorro",
  title = "Cuidar com ciência e afeto.",
  subtitle = "Sobre nós",
  intro = "A VET Dev nasceu da paixão por oferecer o melhor cuidado possível aos pets — unindo tecnologia, medicina veterinária baseada em evidências e carinho em cada detalhe.",
  bullets = [
    "Profissionais experientes e apaixonados por pets.",
    "Estrutura moderna com exames e diagnóstico no local.",
    "Atendimento humanizado e planos de prevenção personalizados.",
  ],
  features = [
    { title: "Atendimento humano e científico", desc: "Escuta ao tutor + protocolos baseados em evidências." },
    { title: "Diagnóstico ágil no local", desc: "Laboratório interno e integração com imagem." },
    { title: "Acompanhamento contínuo", desc: "Retornos programados e prontuário digital." },
  ],
  stats = [
    { label: "Pets atendidos", value: "+5.000" },
    { label: "Avaliação", value: "4,9★" },
    { label: "Anos de cuidado", value: "8+" },
  ],
  ctas = [
    { href: "/servicos", label: "Conheça nossos serviços", variant: "primary" },
    { href: "/contact", label: "Agendar consulta", variant: "outline"}
  ],
}: Props) {
  return (
    <section id={id} className="bg-surface text-text-main scroll-mt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        {/* Imagem */}
        <div className="relative order-2 md:order-1">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Stats */}
            {stats?.length ? (
              <div className="grid grid-cols-3 gap-3 p-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-surface px-3 py-3 text-center ring-1 ring-black/5">
                    <div className="text-lg font-semibold text-primary">{s.value}</div>
                    <div className="text-xs text-text-main/70">{s.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          
          {/* glow decorativo */}
          <div className="pointer-events-none absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-3xl bg-accent/10 blur-2xl" />
        </div>

        {/* Texto */}
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-sm text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            {subtitle}
          </div>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-text-main/80">{intro}</p>

          {/* Bullets */}
          {bullets?.length ? (
            <ul className="mt-6 grid gap-3 text-sm text-text-main/80">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Features */}
          {features?.length ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {/* ícone minimal */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <circle cx="12" cy="12" r="8" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-primary">{f.title}</div>
                  <p className="mt-1 text-sm text-text-main/75">{f.desc}</p>
                </div>
              ))}
            </div>
          ) : null}

          {/* CTAs */}
          {ctas?.length ? (
            <div className="mt-8 flex flex-wrap gap-4">
              {ctas.map((c) =>
                c.variant === "outline" ? (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white px-5 py-3 font-medium text-primary transition hover:border-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 font-medium text-white shadow-sm transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {c.label}
                  </Link>
                )
              )}
            </div>
          ) : null}
          
        </div>
      </div>

   
    </section>
  );
}
