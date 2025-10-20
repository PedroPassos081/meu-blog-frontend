// ARQUIVO: src/app/blog/[slug]/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

type StrapiImage = {
  url: string;
  alternativeText?: string;
};

type FlatPost = {
  id: number;
  titulo: string;
  conteudo: any;
  slug: string;
  imagem_destaque?: StrapiImage | null;
};

function buildImageUrl(file?: StrapiImage | null) {
  const url = file?.url;
  if (!url) return null;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return url.startsWith("http") ? url : `${strapiUrl}${url}`;
}

async function getPost(slug: string): Promise<FlatPost | null> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const res = await fetch(`${strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=imagem_destaque`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Falha ao buscar o post');

    const data = await res.json();
    if (data.data && data.data.length > 0) {
      // ⚠️ Alguns Strapi retornam atributos dentro de "attributes"
      const raw = data.data[0];
      return raw.attributes ? { id: raw.id, ...raw.attributes } : raw;
    }

    return null;
  } catch (error) {
    console.error("ERRO AO BUSCAR POST:", error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
        <Link href="/blog" className="text-[--color-primary] hover:underline">
          Voltar para o blog
        </Link>
      </main>
    );
  }

  const imageUrl = buildImageUrl(post.imagem_destaque);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-[--color-surface] text-[--color-text-main]">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-sm ring-1 ring-black/5">
        
        {/* ===== BOTÃO DE VOLTAR (TOPO) ===== */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[--color-primary]/10 px-4 py-2 text-sm font-medium text-[--color-primary] transition hover:bg-[--color-primary]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Voltar para o blog
          </Link>
        </div>

        {/* ===== IMAGEM DE CAPA ===== */}
        {imageUrl && (
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.imagem_destaque?.alternativeText || post.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* ===== TÍTULO ===== */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-[--color-text-main]">
          {post.titulo}
        </h1>

        {/* ===== CONTEÚDO ===== */}
        <div className="prose prose-lg max-w-none text-[--color-text-main] prose-headings:text-[--color-primary] prose-a:text-[--color-accent] hover:prose-a:underline">
          {post.conteudo && <BlocksRenderer content={post.conteudo} />}
        </div>

        {/* ===== BOTÃO DE VOLTAR (FINAL) ===== */}
        <div className="mt-12 border-t pt-6 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[--color-primary]/10 px-4 py-2 text-sm font-medium text-[--color-primary] transition hover:bg-[--color-primary]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Voltar para o blog
          </Link>
        </div>
      </div>
    </main>
  );
}
