import Image from "next/image";
import Link from "next/link";

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL;
if (!BASE)
  throw new Error("Defina NEXT_PUBLIC_STRAPI_URL no .env.local (ex.: http://localhost:1337)");

const CONTENT_UID = "posts";
const COVER_FIELD = "imagem_destaque";
const TITLE_FIELD = "titulo";
const SLUG_FIELD = "slug";
const CONTENT_FIELD = "conteudo";
const DEFAULT_PAGE_SIZE = 9;

// ========== tipos ==========
type StrapiImage = { url: string; alternativeText?: string };
type StrapiFile<T> = { data?: { attributes: T } | null } | null;

type PostAttrs = {
  [TITLE_FIELD]: string;
  [SLUG_FIELD]: string;
  [CONTENT_FIELD]?: any;
  publishedAt: string;
  [COVER_FIELD]?: StrapiFile<StrapiImage>;
};

type StrapiListResponse = {
  data: { id: number; attributes: PostAttrs }[];
  meta: { pagination: { page: number; pageCount: number; pageSize: number; total: number } };
};

// ========== utils ==========
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

function buildImageUrl(file?: StrapiFile<StrapiImage>) {
  const url = file?.data?.attributes?.url;
  return url ? (url.startsWith("http") ? url : `${BASE}${url}`) : null;
}

function blocksToExcerpt(blocks: any, max = 180) {
  try {
    const texts: string[] = [];
    const traverse = (node: any) => {
      if (!node) return;
      if (Array.isArray(node)) node.forEach(traverse);
      else if (typeof node === "object") {
        if (node.type === "paragraph" && Array.isArray(node.children)) {
          texts.push(node.children.map((c: any) => c.text ?? "").join(""));
        }
        if (node.children) traverse(node.children);
      }
    };
    traverse(blocks);
    const joined = texts.join(" ").trim();
    return joined.length > max ? `${joined.slice(0, max).trim()}…` : joined;
  } catch {
    return "";
  }
}

async function getPosts(page: number, pageSize: number): Promise<StrapiListResponse> {
  const qs = new URLSearchParams({
    sort: "publishedAt:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    [`populate[${COVER_FIELD}]`]: "true",
  });
  const url = `${BASE}/api/${CONTENT_UID}?${qs}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Erro Strapi ${res.status}: ${await res.text()}`);
  return res.json();
}

// ========== página ==========
export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string; pageSize?: string };
}) {
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const pageSize = Math.min(24, Math.max(3, Number(searchParams?.pageSize ?? DEFAULT_PAGE_SIZE)));

  const { data, meta } = await getPosts(page, pageSize);
  const { pageCount } = meta.pagination;

  return (
    <main className="bg-surface text-text-main">
      {/* HERO */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
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
            <p className="text-text-main/70">Nenhum post publicado ainda.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((item, i) => {
                const a = item as any;
                const title = a[TITLE_FIELD];
                const slug = a[SLUG_FIELD];
                const coverFile = a[COVER_FIELD]
                  ? { data: { attributes: a[COVER_FIELD] } }
                  : null;
                const cover = buildImageUrl(coverFile as StrapiFile<StrapiImage>);
                const excerpt = blocksToExcerpt(a[CONTENT_FIELD]);
                return (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20"
                  >
                    {cover && (
                      <Link href={`/blog/${slug}`} className="block overflow-hidden">
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
                        <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
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
                Página <strong className="text-text-main">{page}</strong> de {pageCount}
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

// ========== componentes auxiliares ==========
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
    return <span className={`${base} cursor-not-allowed text-text-main/40`}>{children}</span>;
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
