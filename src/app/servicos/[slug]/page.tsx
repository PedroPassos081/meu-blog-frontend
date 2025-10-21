// src/app/servicos/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, SERVICES } from "@/lib/data/services";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getServiceBySlug(params.slug);
  if (!s) return {};
  return {
    title: `${s.title} | VET Dev`,
    description: s.summary,
    alternates: { canonical: `/servicos/${s.slug}` },
  };
}

export default function ServicePage({ params }: Props) {
  const s = getServiceBySlug(params.slug);
  if (!s) return notFound();

  return (
    <main className="bg-surface">
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <nav className="text-sm text-text-main/70">
            <Link href="/">Home</Link> <span className="mx-1.5">/</span>
            <Link href="/servicos">Serviços</Link>{" "}
            <span className="mx-1.5">/</span>
            <span className="text-text-main">{s.title}</span>
          </nav>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            {s.title}
          </h1>
          <p className="mt-2 max-w-[65ch] text-text-main/85">{s.summary}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-3">
          <article className="md:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-semibold text-primary">
                O que oferecemos
              </h2>

              {/* se tiver features, mostra os cards; senão, cai no fallback de bullets */}
              {s.features?.length ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <div
                      key={f.title}
                      className="group relative overflow-hidden rounded-xl p-4 ring-1 ring-black/5 bg-surface hover:bg-white transition"
                    >
                      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {iconSwitch(f.icon)}
                      </div>
                      <h3 className="text-sm font-semibold text-primary">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-main/80">{f.desc}</p>

                      {/* detalhe de realce no hover */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 transition group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-text-main/90"
                    >
                      <span className="mt-1 inline-block h-4 w-4 rounded-full bg-accent/15 text-accent">
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-semibold text-primary">
                Quando indicar
              </h2>
              <ul className="mt-3 list-disc pl-5 text-text-main/90 space-y-1">
                {s.indications.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-semibold text-primary">
                Como funciona
              </h2>
              <ul className="mt-3 grid gap-2 text-text-main/90">
                {s.includes.map((i, idx) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary font-semibold">
                      {idx + 1}.
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-semibold text-primary">
                Agende agora
              </h3>
              <Link
                href="/contato"
                className="mt-3 inline-flex rounded-xl bg-accent px-5 py-2.5 font-semibold text-white shadow-md hover:opacity-90"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
function iconSwitch(k: string | undefined) {
  switch (k) {
    case "steth":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M6 3v6a4 4 0 1 0 8 0V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 13v2a6 6 0 0 0 12 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "lab":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M10 3v6l-5 8a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-8V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 9h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.65-7 9-7 9z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V13H9v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return null;
  }
}
