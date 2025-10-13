// src/app/servicos/page.tsx
import Services from "@/components/Services";
import Link from "next/link";

export default function ServicosHub() {
  return (
    <main className="bg-surface">
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Serviços
          </h1>
          <p className="mt-2 max-w-[65ch] text-text-main/85">
            Do check-up ao diagnóstico avançado, cuidamos do seu pet com equipe
            experiente e estrutura moderna.
          </p>
          <div className="mt-4">
            <Link
              href="/contato"
              className="rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-md hover:opacity-90"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
      </section>

      <Services />
    </main>
  );
}
