// src/data/services.ts
export type Feature = {
  title: string;
  desc: string;
  icon?: "steth" | "shield" | "lab" | "clock" | "heart" | "home";
};

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  indications: string[];
  includes: string[];
  duration?: string;
  prep?: string[];
  features?: Feature[]; // <— NOVO
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "clinica",
    title: "Clínica geral",
    summary:
      "Consultas, vacinas e acompanhamento contínuo com foco em prevenção e bem-estar.",
    bullets: [
      "Consulta completa",
      "Vacinas e vermifugação",
      "Acompanhamento por ciclo de vida",
    ],
    indications: [
      "Check-ups de rotina",
      "Vacinas em dia",
      "Alterações de comportamento ou apetite",
    ],
    includes: [
      "Consulta com vet.",
      "Anamnese e exame físico",
      "Plano de cuidados",
    ],
    duration: "30–45 min",
    prep: [
      "Leve a carteirinha de vacinação",
      "Liste sintomas e medicamentos usados",
    ],
    features: [
      {
        title: "Triagem rápida",
        desc: "Atendimento ágil e organizado.",
        icon: "clock",
      },
      {
        title: "Protocolo baseado em evidências",
        desc: "Condutas alinhadas à literatura.",
        icon: "shield",
      },
      {
        title: "Acolhimento ao tutor",
        desc: "Orientações claras e humanizadas.",
        icon: "heart",
      },
      {
        title: "Acompanhamento contínuo",
        desc: "Plano de saúde e retornos programados.",
        icon: "steth",
      },
      {
        title: "Prontuário digital",
        desc: "Histórico centralizado e seguro.",
        icon: "lab",
      },
      {
        title: "Teleorientação",
        desc: "Tira-dúvidas pós-consulta.",
        icon: "home",
      },
    ],
  },
  {
    slug: "laboratorio",
    title: "Laboratório interno",
    summary:
      "Exames no local com resultados ágeis: sangue, urina, fezes e mais.",
    bullets: [
      "Hemograma e bioquímica",
      "Urinálise e coproparasitológico",
      "Resultados rápidos",
    ],
    indications: ["Suspeita de doença", "Pré-operatório", "Check-up anual"],
    includes: [
      "Coleta assistida",
      "Laudo técnico",
      "Orientação de próxima conduta",
    ],
    features: [
      {
        title: "Resultados no mesmo dia",
        desc: "Velocidade que faz diferença.",
        icon: "clock",
      },
      {
        title: "Qualidade assegurada",
        desc: "Controles internos e validação.",
        icon: "shield",
      },
      {
        title: "Painéis completos",
        desc: "Perfil renal, hepático, endócrino.",
        icon: "lab",
      },
      {
        title: "Integração com clínica",
        desc: "Fluxo rápido entre consulta e exame.",
        icon: "steth",
      },
      {
        title: "Coleta humanizada",
        desc: "Reduz estresse do pet.",
        icon: "heart",
      },
      {
        title: "Entrega digital",
        desc: "Laudos no e-mail/WhatsApp.",
        icon: "home",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
