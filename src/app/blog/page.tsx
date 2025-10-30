// src/app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";

/* ===================== Config ===================== */
function getBase() {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "";
}
function getToken() {
  // Se configurar STRAPI_API_TOKEN na Render, o front enviará Authorization: Bearer
  return process.env.STRAPI_API_TOKEN || "";
}

const CONTENT_UID = "posts" as const;
const COVER_FIELD = "imagem_destaque" as const;
const TITLE_FIELD = "titulo" as const;
const SLUG_FIELD = "slug" as const;
const CONTENT_FIELD = "conteudo" as const;
const DEFAULT_PAGE_SIZE = 9 as const;

/* ===================== Tipos ===================== */
type StrapiImage = { url: string; alternativeText?: string };
type StrapiFile<T> = { data?: { attributes: T } | null } | null;

type PostAttrs = {
  [TITLE_FIELD]: string;
  [SLUG_FIELD]: string;
  [CONTENT_FIELD]?: unknown;
  publishedAt: string;
  [COVER_FIELD]?: StrapiFile<StrapiImage> | StrapiImage | null;
};

type PostItem =
  | { id: number; attributes: PostAttrs } // formato padrão do Strapi
  | ({ id: number } & PostAttrs); // formato “flat”

type StrapiListResponse = {
  data: PostItem[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

/* ===== Rich Text – tipos simples para o que usamos ===== */
type RTTextNode = { text?: string };
type RTNode = { type?: string; children?: RTNode[] | RTTextNode[] };

/* ===================== Utils ===================== */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
/** Converte mídia em ambos formatos (flatten e data/attributes) para StrapiFile */
function toMediaField(img: unknown): StrapiFile<StrapiImage> | null {
  if (!img) return null;
  if (isObject(img) && "data" in img) return img as StrapiFile<StrapiImage>;
  if (isObject(img) && "url" in img)
    return { data: { attributes: img as StrapiImage } };
  return null;
}
function buildImageUrl(file?: StrapiFile<StrapiImage>) {
  const BASE = getBase();
  const url = file?.data?.attributes?.url;
  return url ? (url.startsWith("http") ? url : `${BASE}${url}`) : null;
}
function isRTNode(n: unknown): n is RTNode {
  return isObject(n);
}
/** Extrai um resumo do rich text tipado */
function blocksToExcerpt(blocks: unknown, max = 180) {
  if (!blocks) return "";
  const texts: string[] = [];
  const traverse = (node: unknown): void => {
    if (!node) return;
    if (Array.isArray(node)) return void node.forEach(traverse);
    if (isRTNode(node)) {
      if (node.type === "paragraph" && Array.isArray(node.children)) {
        const t = node.children
          .map((c) =>
            isObject(c) && "text" in c
              ? String((c as RTTextNode).text ?? "")
              : ""
          )
          .join("");
        if (t.trim()) texts.push(t);
      }
      if (node.children) traverse(node.children);
    }
  };
  traverse(blocks);
  const joined = texts.join(" ").trim();
  return joined.length > max ? `${joined.slice(0, max).trim()}…` : joined;
}
/** Normaliza o item do Strapi para sempre termos `a` como atributos */
function getAttrs(item: PostItem): PostAttrs {
  return "attributes" in item ? item.attributes : item;
}

/* ===================== Data ===================== */
async function getPosts(
  page: number,
  pageSize: number
): Promise<StrapiListResponse> {
  const BASE = getBase();
  // Sem BASE configurada → devolve vazio (não quebra o build)
  if (!BASE) {
    return {
      data: [],
      meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } },
    };
  }

  const qs = new URLSearchParams({
    sort: "publishedAt:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    [`populate[${COVER_FIELD}]`]: "true",
  });

  const headers: HeadersInit = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `${BASE}/api/${CONTENT_UID}?${qs}`;
  const res = await fetch(url, { headers, next: { revalidate: 60 } });

  if (!res.ok) {
    // 403 normalmente é permissão pública desabilitada ou falta de token
    if (res.status === 403) {
      console.warn(
        "Strapi 403: habilite find/findOne em Public ou configure STRAPI_API_TOKEN."
      );
      return {
        data: [],
        meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } },
      };
    }
    throw new Error(`Erro Strapi ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

/* ===================== Página ===================== */
export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string; pageSize?: string };
}) {
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const pageSize = Math.min(
    24,
    Math.max(3, Number(searchParams?.pageSize ?? DEFAULT_PAGE_SIZE))
  );

  const { data, meta } = await getPosts(page, pageSize);
  const { pageCount } = meta.pagination;

  const BASE = getBase();

  return (
    <main className="bg-surface text-text-main">
      {/* HERO */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Blog da VET Dev
          </h1>
          <p className="mt-3 max-w-[70ch] text-text-main/85">
            Dicas de saúde, nutrição e bem-estar para o seu pet — conteúdo leve,
            atualizado e baseado em evidências.
          </p>
        </div>
      </section>

      {/* LISTAGEM */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {data.length === 0 ? (
            <p className="text-text-main/70">
              {!BASE
                ? "Blog indisponível: configure NEXT_PUBLIC_STRAPI_URL no ambiente."
                : "Nenhum post publicado ainda."}
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((item, i) => {
                const a = getAttrs(item);
                const title = a[TITLE_FIELD];
                const slug = a[SLUG_FIELD];
                const cover = buildImageUrl(toMediaField(a[COVER_FIELD]));
                const excerpt = blocksToExcerpt(a[CONTENT_FIELD]);

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20"
                  >
                    {cover && (
                      <Link
                        href={`/blog/${slug}`}
                        className="block overflow-hidden"
                      >
                        <Image
                          src={cover}
                          alt={title}
                          width={720}
                          height={420}
                          priority={i < 3}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </Link>
                    )}

                    <div className="flex flex-col flex-1 p-6">
                      <div className="mb-2 flex items-center justify-between text-xs text-text-main/60">
                        <time dateTime={a.publishedAt}>
                          {formatDate(a.publishedAt)}
                        </time>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                          Artigo
                        </span>
                      </div>

                      <Link href={`/blog/${slug}`} className="group/link">
                        <h2 className="text-lg font-semibold text-primary transition group-hover/link:underline">
                          {title}
                        </h2>
                      </Link>

                      {excerpt && (
                        <p className="mt-2 text-sm leading-relaxed text-text-main/80 line-clamp-3">
                          {excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-4">
                        <Link
                          href={`/blog/${slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
                        >
                          Ler artigo
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
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* PAGINAÇÃO */}
          {pageCount > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <PagerLink targetPage={page - 1} disabled={page <= 1}>
                ← Anterior
              </PagerLink>
              <span className="text-sm text-text-main/70">
                Página <strong className="text-text-main">{page}</strong> de{" "}
                {pageCount}
              </span>
              <PagerLink targetPage={page + 1} disabled={page >= pageCount}>
                Próxima →
              </PagerLink>
            </div>
          )}
        </div>
      </section>

      {/* BOTÃO VOLTAR AO TOPO */}
      <div className="flex justify-center pb-16">
        <Link
          href="#top"
          className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary transition hover:bg-primary/20"
        >
          ↑ Voltar ao topo
        </Link>
      </div>
    </main>
  );
}

/* ===================== Auxiliares ===================== */
function PagerLink({
  targetPage,
  disabled,
  children,
}: {
  targetPage: number;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";
  if (disabled)
    return (
      <span className={`${base} cursor-not-allowed text-text-main/40`}>
        {children}
      </span>
    );
  return (
    <Link
      href={`/blog?page=${targetPage}`}
      className={`${base} text-primary hover:bg-primary/5`}
      scroll={false}
    >
      {children}
    </Link>
  );
}
