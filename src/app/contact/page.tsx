import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | VET Dev",
  description: "Fale com a VET Dev: agende consulta, tire dúvidas e receba orientações.",
};

export default function Contact() {
  return (
    <main className="bg-surface text-text-main">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-primary">Contato</h1>
        <p className="mt-2 text-text-main/80">Agende uma consulta ou tire suas dúvidas.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Form “estático” (substitua por integração depois) */}
          <form
            className="rounded-2xl bg-white p-6 ring-1 ring-black/5"
            action="mailto:contato@vetdev.com" // trocar quando ligar backend
            method="post"
            encType="text/plain"
          >
            <label className="block text-sm font-medium text-primary">
              Seu nome
              <input className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2"
                     name="nome" required />
            </label>

            <label className="mt-4 block text-sm font-medium text-primary">
              E-mail
              <input type="email" className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2"
                     name="email" required />
            </label>

            <label className="mt-4 block text-sm font-medium text-primary">
              Mensagem
              <textarea className="mt-1 w-full rounded-xl border border-primary/20 bg-surface px-3 py-2"
                        rows={5} name="mensagem" />
            </label>

            <button
              className="mt-6 rounded-xl bg-accent px-5 py-3 font-medium text-white hover:opacity-90"
              type="submit"
            >
              Enviar
            </button>
          </form>

          {/* Infos rápidas */}
          <aside className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
            <h2 className="text-base font-semibold text-primary">Informações</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><strong>Telefone:</strong> (81) 0000-0000</li>
              <li><strong>WhatsApp:</strong> (81) 9 8971-4251</li>
              <li><strong>E-mail:</strong> pedro.passos01@gmail.com</li>
              <li><strong>Endereço:</strong> Rua Exemplo, 123 — Recife/PE</li>
              <li><strong>Horários:</strong> Seg–Sex 8h–18h, Sáb 8h–12h</li>
            </ul>

            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface ring-1 ring-black/5">
              {/* Google Maps embed de exemplo */}
              <iframe
                title="Mapa VET Dev"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19036.425153917244!2d-74.0071789285233!3d40.73843702593171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1760902772730!5m2!1spt-BR!2sbr"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
    );
}

