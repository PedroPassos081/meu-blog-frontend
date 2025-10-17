import Image from "next/image";
import Link from "next/link";

// ===== CONFIG =====
const BASE = process.env.NEXT_PUBLIC_STRAPI_URL;
if (!BASE) {
  throw new Error(
    "Defina NEXT_PUBLIC_STRAPI_URL no .env.local (ex.: http://localhost:1337)"
  );
}

const CONTENT_UID = "posts"; // coleção "Post" => /api/posts
const COVER_FIELD = "imagem_destaque"; // campo de mídia
const TITLE_FIELD = "titulo";
const SLUG_FIELD = "slug";
const CONTENT_FIELD = "conteudo"; // Blocks (vamos extrair um pequeno trechinho)
const DEFAULT_PAGE_SIZE = 9;

// ===== Tipos básicos =====
type StrapiImage = { url: string; alternativeText?: string };
type StrapiFile<T> = { data?: { attributes: T } | null } | null;

type PostAttrs = {
  [TITLE_FIELD]: string;
  [SLUG_FIELD]: string;
  [CONTENT_FIELD]?: any;
  publishedAt: string;
  [COVER_FIELD]?: StrapiFile<StrapiImage>;
  // campos extras bem-vindos…
};

type StrapiListResponse = {
  data: { id: number; attributes: PostAttrs }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// ===== Helpers =====
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
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE}${url}`;
}

// extrai 1º parágrafo de blocks como “excerpt”
function blocksToExcerpt(blocks: any, max = 160) {
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
    const joined = texts.filter(Boolean).join(" ").trim();
    return joined.length > max ? `${joined.slice(0, max).trim()}…` : joined;
  } catch {
    return undefined;
  }
}

async function getPosts(
  page: number,
  pageSize: number
): Promise<StrapiListResponse> {
  const qs = new URLSearchParams({
    sort: "publishedAt:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    [`populate[${COVER_FIELD}]`]: "true",
  });

  const url = `${BASE}/api/${CONTENT_UID}?${qs.toString()}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi respondeu ${res.status} em:\n${url}\n\n${text}`);
  }
  return (await res.json()) as StrapiListResponse;
}

// ===== Página =====
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

  return (
    <main className="bg-surface">
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Blog
          </h1>
          <p className="mt-2 max-w-[70ch] text-text-main/85">
            Dicas de saúde, nutrição e bem-estar para seu pet, em linguagem
            simples e baseada em evidências.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {data.length === 0 ? (
            <p className="text-text-main/80">Nenhum post publicado ainda.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.map((item) => {
                // A CORREÇÃO ESTÁ AQUI: 'a' agora é o próprio 'item', pois sua API não tem a camada 'attributes'.
                const a = item as any; // Usamos 'any' aqui para simplificar, pois a estrutura real é diferente da esperada pelo tipo PostAttrs.

                const title = a[TITLE_FIELD] as string;
                const slug = a[SLUG_FIELD] as string;

                // A função buildImageUrl precisa receber o objeto da imagem diretamente.
                // Precisamos simular a estrutura que a função espera.
                const coverFile = a[COVER_FIELD]
                  ? { data: { attributes: a[COVER_FIELD] } }
                  : null;
                const cover = buildImageUrl(
                  coverFile as StrapiFile<StrapiImage>
                );

                const excerpt = blocksToExcerpt(a[CONTENT_FIELD]);

                return (
                  <article
                    key={item.id} // Usamos item.id que ainda existe
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20"
                  >
                    {cover && (
                      <Link href={`/blog/${slug}`} className="block">
                        <Image
                          src={cover}
                          alt={title}
                          width={720}
                          height={420}
                          className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </Link>
                    )}

                    <div className="p-5">
                      <div className="mb-2 text-xs text-text-main/60">
                        <time dateTime={a.publishedAt}>
                          {formatDate(a.publishedAt)}
                        </time>
                      </div>

                      <Link href={`/blog/${slug}`} className="block">
                        <h2 className="text-lg font-semibold leading-snug text-primary group-hover:underline">
                          {title}
                        </h2>
                      </Link>

                      {excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-main/80">
                          {excerpt}
                        </p>
                      )}

                      <div className="mt-4">
                        <Link
                          href={`/blog/${slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
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

                    <div className="pointer-events-none h-1 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 transition group-hover:opacity-100" />
                  </article>
                );
              })}
            </div>
          )}

          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <PagerLink targetPage={page - 1} disabled={page <= 1}>
                Anterior
              </PagerLink>
              <span className="text-sm text-text-main/70">
                Página <strong className="text-text-main">{page}</strong> de{" "}
                {pageCount}
              </span>
              <PagerLink targetPage={page + 1} disabled={page >= pageCount}>
                Próxima
              </PagerLink>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

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
    "inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition";
  if (disabled) {
    return (
      <span
        className={`${base} cursor-not-allowed bg-white text-text-main/40 ring-black/5`}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={`/blog?page=${targetPage}`}
      className={`${base} bg-white text-primary ring-primary/20 hover:bg-primary/5`}
    >
      {children}
    </Link>
  );
}
