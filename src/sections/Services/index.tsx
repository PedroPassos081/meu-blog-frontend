// src/components/Services.tsx
import Link from "next/link";

type Service = {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Veterinário",
    desc: "Consultas, vacinas e acompanhamento personalizado para cada fase da vida do seu pet.",
    href: "/servicos/clinica",
    icon: <StethIcon />,
  },
  {
    title: "Prevenção",
    desc: "Vermífugos, antipulgas e protocolos preventivos para manter a saúde sempre em dia.",
    href: "/servicos/prevencao",
    icon: <SprayIcon />,
  },
  {
    title: "PetsHotel",
    desc: "Hospedagem acolhedora e supervisionada para cães e gatos com rotina de bem-estar.",
    href: "/servicos/petshotel",
    icon: <HotelIcon />,
  },
  {
    title: "Estética",
    desc: "Banho, tosa e cuidados estéticos feitos por profissionais experientes e carinhosos.",
    href: "/servicos/estetica",
    icon: <GroomIcon />,
  },
  {
    title: "Certificados de Viagem",
    desc: "Emissão de atestados e orientações para viagens nacionais e internacionais.",
    href: "/servicos/certificados",
    icon: <PassportIcon />,
  },
  {
    title: "Laboratório Interno",
    desc: "Exames no local com resultados ágeis: sangue, imagem e outros diagnósticos.",
    href: "/servicos/laboratorio",
    icon: <LabIcon />,
  },
];

export default function Services() {
  return (
    <section className="relative bg-surface py-16 md:py-20">
      {/* faixa sutil no topo para “quebrar” a seção */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 h-16 [background:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.04))]"
      />
      <div className="mx-auto max-w-7xl px-6">
        {/* título */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-primary shadow-sm ring-1 ring-black/5">
            Cuidado completo
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Nossos serviços
          </h2>
          <p className="mt-2 text-text-main/80">
            Estrutura moderna, equipe experiente e protocolos baseados em
            evidências.
          </p>
        </div>

        {/* grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="
                group relative overflow-hidden rounded-3xl bg-white p-6
                shadow-sm ring-1 ring-black/5 transition
                hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20
              "
            >
              {/* canto com gradiente sutil */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full 
                           [background:radial-gradient(circle,_color-mix(in_oklab,_var(--color-primary)_18%,_white)_10%,_transparent_60%)] opacity-40"
              />
              {/* ícone */}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                {s.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-primary">
                {s.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-main/80">
                {s.desc}
              </p>

              <div className="mt-4">
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Ver detalhes
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition group-hover:translate-x-0.5"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>

              {/* borda inferior de realce */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 transition group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Icons minimalistas (SVG inline) ===== */
function StethIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
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
}
function SprayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="7"
        y="8"
        width="10"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M10 8V5a2 2 0 0 1 2-2h3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18.5" cy="4.5" r="0.8" fill="currentColor" />
      <circle cx="20.5" cy="6.5" r="0.8" fill="currentColor" />
      <circle cx="20" cy="3" r="0.6" fill="currentColor" />
    </svg>
  );
}
function HotelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="3"
        y="8"
        width="18"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 12h2M11 12h2M15 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function GroomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 4l6 6M10 4L4 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 4l4 4M20 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 14l4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PassportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="6"
        y="3"
        width="12"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 16h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function LabIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
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
}
