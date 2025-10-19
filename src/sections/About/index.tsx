// src/sections/About/index.tsx
import Image from "next/image";
import Link from "next/link";

export default function About({ id = "about" }: { id?: string }) {
  return (
    <section id={id} className="bg-surface text-text-main scroll-mt-24"  >
      <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 md:items-center">
        
        <div className="relative order-2 md:order-1">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            <Image
              src="/images/vet.jpg"
              alt="Veterinária cuidando de um cachorro"
              width={800}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="pointer-events-none absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-3xl bg-accent/10 blur-2xl" />
        </div>

        {/* Texto */}
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-sm text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Sobre nós
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-primary sm:text-5xl">
            Cuidar com ciência e afeto.
          </h2>

          <p className="mt-6 text-lg text-text-main/80 leading-relaxed">
            A <span className="font-semibold text-primary">VET Dev</span> nasceu
            da paixão por oferecer o melhor cuidado possível aos pets — unindo
            tecnologia, medicina veterinária baseada em evidências e carinho em
            cada detalhe.
          </p>

          <p className="mt-4 text-text-main/80">
            Nosso compromisso vai além do atendimento: buscamos criar uma
            experiência acolhedora tanto para o animal quanto para o tutor,
            garantindo segurança, transparência e bem-estar em cada consulta.
          </p>

          <ul className="mt-8 grid gap-3 text-sm text-text-main/80">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Profissionais experientes e apaixonados por pets.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-info" />
              Estrutura moderna com exames e diagnóstico no local.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Atendimento humanizado e planos de prevenção personalizados.
            </li>
          </ul>

          <div className="mt-8 flex gap-4">
            <Link
              href="/servicos"
              className="rounded-xl bg-accent px-5 py-3 font-medium text-white transition hover:bg-accent/90"
            >
              Conheça nossos serviços
            </Link>
            <Link
              href="/contato"
              className="rounded-xl border border-primary/20 bg-white px-5 py-3 font-medium text-primary transition hover:border-primary/30"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
