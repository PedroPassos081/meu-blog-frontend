// ARQUIVO: src/app/blog/[slug]/page.tsx (Versão Definitiva e Corrigida)

import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// 1. O tipo do Post é "plano", sem a camada 'attributes'
type Post = {
  id: number;
  titulo: string;
  conteudo: any;
  slug: string;
  // Outros campos como createdAt, etc., podem ser adicionados aqui
};

// 2. A função de busca está correta, mas o objeto que ela retorna é "plano"
async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `http://127.0.0.1:1337/api/posts?filters[slug][$eq]=${slug}`
    );

    if (!res.ok) throw new Error("Falha ao buscar o post");

    const data = await res.json();

    // A API retorna { data: [ POST_PLANO_AQUI ] }
    if (data.data && data.data.length > 0) {
      return data.data[0]; // Retornamos o objeto "plano"
    }

    return null;
  } catch (error) {
    console.error("ERRO AO BUSCAR POST:", error);
    return null;
  }
}

// O componente da página
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // postData agora é o nosso objeto de post "plano"
  const postData = await getPost(params.slug);

  if (!postData) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 text-center">
        <h1 className="text-4xl font-bold">Post não encontrado</h1>
        <Link href="/blog" className="mt-8 text-blue-600 hover:underline">
          Voltar para a página inicial
        </Link>
      </main>
    );
  }

  // 3. A CORREÇÃO FINAL: A variável 'post' é o próprio 'postData'.
  // Removemos completamente a referência a '.attributes'.
  const post = postData;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        {/* Agora acessamos post.titulo diretamente */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8">
          {post.titulo}
        </h1>

        <div className="prose lg:prose-xl max-w-none text-gray-800">
          {post.conteudo && <BlocksRenderer content={post.conteudo} />}
        </div>

        <div className="mt-12 border-t pt-6">
          <Link href="/blog" className="text-blue-600 hover:underline">
            &larr; Voltar para todos os posts
          </Link>
        </div>
      </div>
    </main>
  );
}
