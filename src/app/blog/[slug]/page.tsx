// src/app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "dompurify";

/* ===================== ENV ===================== */
function getBase(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "";
}
function getToken(): string {
  return process.env.STRAPI_API_TOKEN || "";
}

/* ===================== Strapi base types ===================== */
type StrapiData<T> = { id: number; attributes: T };
type StrapiListResponse<T> = { data: Array<StrapiData<T> | T> };
type Relation<T> = { data: StrapiData<T> | null } | null;

type StrapiImage = { url: string; alternativeText?: string };
type StrapiFile<T> = { data?: { attributes: T } | null } | null;

/* ===================== Blocks (dynamic zone) ===================== */
type BaseBlock = { __component?: string };

type RichTextBlock = BaseBlock & {
  // ex.: "shared.rich-text"
  body?: string; // Markdown
  content?: string; // fallback em Markdown
};
type QuoteBlock = BaseBlock & {
  __component?: string;
  text?: string;
  quote?: string;
  author?: string;
};
type MediaBlock = BaseBlock & {
  __component?: string;
  file?: StrapiFile<StrapiImage>;
  image?: StrapiFile<StrapiImage>;
  alt?: string;
};

type Block = RichTextBlock | QuoteBlock | MediaBlock | BaseBlock;

/* ======== Type guards seguros (sem any) ======== */
function isObjectRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function isRichText(b: Block | unknown): b is RichTextBlock {
  if (!isObjectRecord(b)) return false;
  const comp = typeof b.__component === "string" ? b.__component : "";
  return (
    comp.includes("rich") ||
    typeof (b as { body?: unknown }).body === "string" ||
    typeof (b as { content?: unknown }).content === "string"
  );
}
function isQuote(b: Block | unknown): b is QuoteBlock {
  if (!isObjectRecord(b)) return false;
  const comp = typeof b.__component === "string" ? b.__component : "";
  return (
    comp.includes("quote") ||
    typeof (b as { text?: unknown }).text === "string" ||
    typeof (b as { quote?: unknown }).quote === "string"
  );
}
function isMedia(b: Block | unknown): b is MediaBlock {
  if (!isObjectRecord(b)) return false;
  const comp = typeof b.__component === "string" ? b.__component : "";
  const hasFile = "file" in b;
  const hasImage = "image" in b;
  return comp.includes("media") || hasFile || hasImage;
}

/* ===================== Article schema (starter) ===================== */
type Author = { name?: string };
type Category = { name?: string };

type ArticleAttrs = {
  title?: string;
  slug?: string;
  description?: string;
  publishedAt?: string;
  cover?: StrapiFile<StrapiImage> | StrapiImage | null;
  author?: Relation<Author>;
  category?: Relation<Category>;
  blocks?: Block[];
};

/* ===================== Utils ===================== */
function hasAttributes<T>(v: unknown): v is StrapiData<T> {
  return typeof v === "object" && v !== null && "attributes" in (v as object);
}
function getAttrs<T>(item: StrapiData<T> | T): T {
  return hasAttributes<T>(item) ? item.attributes : (item as T);
}
function buildImageUrl(
  file?: StrapiFile<StrapiImage> | StrapiImage | null
): string | null {
  const BASE = getBase();
  const direct =
    (file as StrapiImage | undefined)?.url ??
    (file as StrapiFile<StrapiImage> | undefined)?.data?.attributes?.url;
  if (!direct) return null;
  return direct.startsWith("http") ? direct : `${BASE}${direct}`;
}
function formatDate(iso?: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso ?? "";
  }
}

/* ===================== Data ===================== */
async function fetchArticleBySlug(
  slug: string
): Promise<StrapiData<ArticleAttrs> | ArticleAttrs | null> {
  const BASE = getBase();
  if (!BASE) return null;

  const qs = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[cover]": "true",
    "populate[author]": "true",
    "populate[category]": "true",
    "populate[blocks]": "true",
  });

  const headers: HeadersInit = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}/api/articles?${qs.toString()}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 403) return null;
    throw new Error(`Erro Strapi ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as StrapiListResponse<ArticleAttrs>;
  return json.data[0] ?? null;
}

/* ===================== Render dos blocks (Markdown → HTML) ===================== */
function RenderBlocks({ blocks }: { blocks: Block[] }) {
  // Garante GFM e <br> em quebras simples
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <p>Sem conteúdo.</p>;
  }

  return (
    <>
      {blocks.map((b, idx) => {
        // RICH TEXT (Markdown no Strapi)
        if (isRichText(b)) {
          const md = b.body ?? b.content ?? "";
          const html = DOMPurify.sanitize((marked.parse(md) as string) || "");
          return (
            <div
              key={idx}
              className="
                prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-teal-800
                prose-h2:text-2xl prose-h3:text-xl
                prose-a:text-teal-700 hover:prose-a:underline
                prose-strong:text-teal-900 prose-li:marker:text-teal-600
                leading-relaxed

                [&_p]:my-5 [&_p]:leading-7
                [&_h2]:mt-10 [&_h2]:mb-5
                [&_h3]:mt-8  [&_h3]:mb-4
                [&_ul]:my-6  [&_ol]:my-6  [&_li]:my-1
                [&_blockquote]:my-6 [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-500
                [&_img]:my-6
                [&_hr]:my-10
              "
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        // QUOTE
        if (isQuote(b)) {
          const text = b.text ?? b.quote ?? "";
          const author = b.author ?? "";
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-teal-500 pl-4 italic text-neutral-800 my-6"
            >
              <p>{text}</p>
              {author ? (
                <footer className="mt-1 not-italic text-sm text-neutral-500">
                  — {author}
                </footer>
              ) : null}
            </blockquote>
          );
        }

        // MEDIA
        if (isMedia(b)) {
          const url = buildImageUrl(b.file ?? b.image ?? null);
          if (!url) return null;
          return (
            <div key={idx} className="my-6 overflow-hidden rounded-2xl">
              <Image
                src={url}
                alt={b.alt ?? "Imagem"}
                width={1200}
                height={700}
                className="h-auto w-full object-cover"
              />
            </div>
          );
        }

        // FALLBACK (bloco desconhecido)
        return (
          <pre
            key={idx}
            className="my-4 overflow-auto rounded bg-neutral-50 p-4 text-xs text-neutral-700"
          >
            {JSON.stringify(b, null, 2)}
          </pre>
        );
      })}
    </>
  );
}

/* ===================== Page ===================== */
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await fetchArticleBySlug(params.slug);
  if (!item) return notFound();

  const a = getAttrs<ArticleAttrs>(item);
  if (!a?.slug) return notFound();

  const title = a.title ?? "";
  const date = a.publishedAt;
  const cover = buildImageUrl(a.cover ?? null);
  const authorName = a.author?.data?.attributes?.name;
  const categoryName = a.category?.data?.attributes?.name;
  const blocks = a.blocks ?? [];

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 py-10">
        <Link href="/blog" className="text-sm text-teal-700 hover:underline">
          ← Voltar para o blog
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold text-teal-900">{title}</h1>

        <div className="mt-2 text-sm text-neutral-600">
          <time dateTime={date}>{formatDate(date)}</time>
          {authorName ? <> · {authorName}</> : null}
          {categoryName ? <> · {categoryName}</> : null}
        </div>

        {cover && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={cover ?? ""}
              alt={title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <article className="mt-8">
          <RenderBlocks blocks={blocks} />
        </article>
      </section>
    </main>
  );
}

/* ===================== Metadata (SEO) ===================== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const item = await fetchArticleBySlug(params.slug);
  if (!item) return { title: "Post não encontrado" };

  const a = getAttrs<ArticleAttrs>(item);
  const title = a.title ?? "Artigo";
  const desc = a.description ?? "";
  const image = buildImageUrl(a.cover ?? null);

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: image ? [{ url: image }] : [],
    },
  };
}
