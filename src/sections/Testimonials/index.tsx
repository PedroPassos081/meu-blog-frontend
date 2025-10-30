// src/sections/Testimonials/index.tsx
import Image from "next/image";

type Testimonial = {
  name: string;
  pet: string;
  text: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ana Clara Mendes",
    pet: "Thor (Golden Retriever)",
    text: "Levo o Thor à VET Dev desde filhote. O atendimento é sempre carinhoso e transparente — sinto que tratam ele como se fosse parte da equipe! Adoro o acompanhamento por WhatsApp após as consultas.",
    avatar: "/images/thor-dog.jpg",
  },
  {
    name: "Carlos Ferreira",
    pet: "Mimi (Persa)",
    text: "A Mimi odeia sair de casa, mas na VET Dev ela fica calma! A equipe tem um cuidado especial com felinos e o laboratório interno agiliza muito os exames.",
    avatar: "/images/man-with-persa.jpg",
  },
  {
    name: "Pedro Passos",
    pet: "Doritos (SRD)",
    text: "Experiência maravilhosa na VET Dev! Atendimento nota 10 desde a recepção até a consulta do meu gato Doritos. A equipe é super atenciosa, competente e explicou tudo direitinho. Dá para ver que realmente amam o que fazem. Super recomendo!",
    avatar: "/images/doritos-cat.jpg",
  },
  {
    name: "Carollina Monte",
    pet: "Oreo (SRD)",
    text: "O que mais gosto é que a clínica explica tudo com clareza. O retorno e o plano preventivo me dão confiança de que Oreo está sempre bem acompanhada.",
    avatar: "/images/oreo-cat.jpg",
  },
];

export default function Testimonials({ id = "depoimentos" }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-white text-text-main scroll-mt-24 border-t border-black/5"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-center">
        {/* ===== Textos e cards ===== */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-3 py-1 text-sm text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Depoimentos
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-primary sm:text-5xl">
            Confiança que se constrói no cuidado diário.
          </h2>

          <p className="mt-4 text-lg text-text-main/80 max-w-[60ch] leading-relaxed">
            Cada atendimento é uma história de afeto, recuperação e parceria.
            Nossos tutores compartilham o que viveram conosco.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((item, i) => (
              <figure
                key={i}
                className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <figcaption className="font-semibold text-primary">
                      {item.name}
                    </figcaption>
                    <p className="text-sm text-text-main/70">{item.pet}</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-text-main/80 leading-relaxed">
                  “{item.text}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>

        {/* ===== Imagem lateral de pet ===== */}
        <div className="relative hidden lg:block">
          <div className="overflow-hidden rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            <Image
              src="/images/girl-with-dog.jpg" // imagem do pet feliz (adicione na pasta /public/images)
              alt="Tutor abraçando seu pet após consulta"
              width={480}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="pointer-events-none absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-3xl bg-accent/10 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
