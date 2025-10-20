// src/app/contato/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato | VET Dev",
  description:
    "Fale com a VET Dev: agende consulta, tire dúvidas e receba orientações sobre o cuidado do seu pet.",
  openGraph: {
    title: "Contato | VET Dev",
    description:
      "Canais oficiais da VET Dev — telefone, WhatsApp, e-mail e endereço. Agende sua consulta.",
    type: "website",
    url: "https://seu-dominio.com/contato",
  },
};

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "VET Dev",
    url: "https://seu-dominio.com",
    telephone: "+55-00-0000-0000",
    email: "pedro.passos081@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
      addressLocality: "Cidade",
      addressRegion: "UF",
      postalCode: "00000-000",
      addressCountry: "BR",
    },
    openingHours: "Mo-Fr 08:00-18:00, Sa 08:00-12:00",
    sameAs: [
      "https://www.instagram.com/seu_perfil",
      "https://www.facebook.com/seu_perfil",
      "https://wa.me/5581989714251"
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function Contact() {
  return (
    <main className="bg-surface text-text-main">
      <JsonLd />

      {/* HERO */}
      <section className="border-b border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-sm text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Contato
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Estamos aqui para ajudar você e seu pet
          </h1>
          <p className="mt-3 max-w-2xl text-text-main/80">
            Tire dúvidas, agende uma consulta e receba orientações personalizadas.
            Responderemos o quanto antes.
          </p>
        </div>
      </section>

      {/* CARDS RÁPIDOS */}
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="WhatsApp"
            desc="Atendimento rápido e humanizado."
            chip="Preferido"
          >
            <Link
              href="https://wa.me/5581989714251"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 font-medium text-white transition hover:bg-accent/90"
            >
              Abrir WhatsApp
            </Link>
          </Card>

          <Card title="Telefone" desc="Seg–Sex 8h–18h | Sáb 8h–12h">
            <Link
              href="tel:+5581989714251"
              className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white px-4 py-2 font-medium text-primary transition hover:border-primary/30"
            >
              (81) 9 8971-4251
            </Link>
          </Card>

          <Card title="E-mail" desc="Retorno em até 1 dia útil.">
            <Link
              href="pedro.passos081@gmail.com"
              className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white px-4 py-2 font-medium text-primary transition hover:border-primary/30"
            >
              pedro.passos081@gmail.com
            </Link>
          </Card>
        </div>
      </section>

      {/* FORM + INFO LATERAL */}
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 lg:grid-cols-3">
          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 md:p-8">
              <h2 className="text-xl font-bold text-primary">Envie uma mensagem</h2>
              <p className="mt-1 text-sm text-text-main/75">
                Preencha os campos abaixo e nossa equipe entrará em contato.
              </p>

              {/* Dica: troque action para seu endpoint (Formspree, API route, etc.) */}
              <form
                className="mt-6 space-y-4"
                action="mailto:contato@vetdev.com"
                method="post"
                encType="text/plain"
              >
                {/* anti-spam honeypot */}
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Seu nome" htmlFor="nome">
                    <input
                      id="nome"
                      name="nome"
                      required
                      className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2 outline-none focus:border-primary"
                      placeholder="Seu nome completo"
                    />
                  </Field>

                  <Field label="E-mail" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      inputMode="email"
                      className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2 outline-none focus:border-primary"
                      placeholder="voce@exemplo.com"
                    />
                  </Field>

                  <Field label="Telefone (opcional)" htmlFor="tel">
                    <input
                      id="tel"
                      name="telefone"
                      type="tel"
                      inputMode="tel"
                      className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2 outline-none focus:border-primary"
                      placeholder="(00) 0000-0000"
                    />
                  </Field>

                  <Field label="Assunto" htmlFor="assunto">
                    <select
                      id="assunto"
                      name="assunto"
                      className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2 outline-none focus:border-primary"
                      defaultValue="consulta"
                    >
                      <option value="consulta">Agendar consulta</option>
                      <option value="duvidas">Dúvidas gerais</option>
                      <option value="vacinas">Vacinas</option>
                      <option value="exames">Exames / laboratório</option>
                      <option value="outros">Outros</option>
                    </select>
                  </Field>
                </div>

                <Field label="Mensagem" htmlFor="mensagem">
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={6}
                    className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2 outline-none focus:border-primary"
                    placeholder="Como podemos ajudar?"
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-accent px-5 py-3 font-medium text-white transition hover:bg-accent/90"
                  >
                    Enviar mensagem
                  </button>
                  <p className="text-xs text-text-main/60">
                    Ao enviar, você concorda com nossa{" "}
                    <Link href="/politica-de-privacidade" className="text-primary underline">
                      Política de Privacidade
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* LATERAL */}
          <aside className="space-y-6">
            {/* Endereço / horários */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <h3 className="text-base font-semibold text-primary">Informações</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <strong>Endereço:</strong> Rua Exemplo, 123 — Cidade/UF
                </li>
                <li>
                  <strong>Horários:</strong> Seg–Sex 8h–18h | Sáb 8h–12h
                </li>
                <li>
                  <strong>Estacionamento:</strong> Convênio com o Park Já
                </li>
              </ul>

              <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface ring-1 ring-black/5">
                <iframe
                  title="Mapa VET Dev"
                  src="https://www.google.com/maps?q=avenida+paulista&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <h3 className="text-base font-semibold text-primary">Dúvidas comuns</h3>
              <ul className="mt-4 divide-y divide-primary/10">
                <Faq q="Atendem emergência?"
                     a="Sim. Sugerimos ligar antes para orientações imediatas e preparo da equipe." />
                <Faq q="Quais formas de pagamento?"
                     a="Cartões, PIX e boleto (planos). Fale conosco se precisar de outras opções." />
                <Faq q="Emitimos certificado de viagem?"
                     a="Sim, nacional e internacional. Traga a carteirinha de vacinação e documentos." />
              </ul>
            </div>

            {/* CTA WhatsApp */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-surface to-secondary/10 p-6 ring-1 ring-black/5">
              <h3 className="text-lg font-semibold text-primary">
                Precisa falar agora?
              </h3>
              <p className="mt-2 text-sm text-text-main/80">
                Chame no WhatsApp e será atendido pela nossa equipe.
              </p>
              <Link
                href="https://wa.me/5581989714251"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
              >
                Abrir WhatsApp
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ---------- componentes internos ---------- */

function Card({
  title,
  desc,
  chip,
  children,
}: {
  title: string;
  desc: string;
  chip?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-primary">{title}</h3>
        {chip ? (
          <span className="rounded-full bg-secondary/20 px-3 py-0.5 text-xs font-medium text-secondary">
            {chip}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-text-main/75">{desc}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-primary">
      {label}
      {children}
    </label>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <li className="py-3">
      <details className="group">
        <summary className="cursor-pointer list-none text-sm font-medium text-primary">
          {q}
          <span className="ml-2 inline-block transition group-open:rotate-180">
            ▾
          </span>
        </summary>
        <p className="mt-2 text-sm text-text-main/75">{a}</p>
      </details>
    </li>
  );
}
