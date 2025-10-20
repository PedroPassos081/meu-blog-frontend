// ARQUIVO: src/app/blog/[slug]/page.tsx

import Link from 'next/link';
import Image from 'next/image'; // Importamos o componente de Imagem
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// Tipo para a imagem como ela vem da sua API
type StrapiImage = {
  url: string;
  alternativeText?: string;
};

// Atualizamos o tipo do Post para incluir a imagem
type FlatPost = {
  id: number;
  titulo: string;
  conteudo: any;
  slug: string;
  imagem_destaque?: StrapiImage | null; // A imagem é opcional
};

// Helper para construir a URL completa da imagem
function buildImageUrl(file?: StrapiImage | null) {
  const url = file?.url;
  if (!url) return null;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return url.startsWith("http") ? url : `${strapiUrl}${url}`;
}

// Função para buscar um post específico (com a alteração na URL)
async function getPost(slug: string): Promise<FlatPost | null> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    
  
    const res = await fetch(`${strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=imagem_destaque`);
    
    if (!res.ok) throw new Error('Falha ao buscar o post');
    
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    
    return null;
  } catch (error) {
    console.error("ERRO AO BUSCAR POST:", error);
    return null;
  }
}

// O componente da página
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 text-center">
        <h1 className="text-4xl font-bold">Post não encontrado</h1>
        <Link href="/blog" className="mt-8 text-[--color-primary] hover:underline">
          Voltar para a página inicial
        </Link>
      </main>
    );
  }

  const imageUrl = buildImageUrl(post.imagem_destaque);

  return (
    
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-[--color-background]">

      
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        
        {/* EXIBIMOS A IMAGEM AQUI! */}
        {imageUrl && (
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.imagem_destaque?.alternativeText || post.titulo}
              layout="fill"
              objectFit="cover"
              priority 
            />
          </div>
        )}
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[--color-text-main] mb-8">{post.titulo}</h1>
        
        <div className="prose lg:prose-xl max-w-none text-[--color-text-main]">
          {post.conteudo && <BlocksRenderer content={post.conteudo} />}
        </div>

        <div className="mt-12 border-t pt-6">
          <Link href="/blog" className="text-[--color-primary] hover:underline">
            &larr; Voltar para todos os posts
          </Link>
        </div>
      </div>
    </main>
  );
}