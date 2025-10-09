// src/app/page.tsx
import Link from "next/link";

// A definição do TIPO continua correta (estrutura plana)
type Post = {
  id: number;
  titulo: string;
  conteudo: any;
  slug: string;
};

// A função que busca os dados
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("http://127.0.0.1:1337/api/posts");
    if (!res.ok) {
      throw new Error("Falha ao buscar os posts");
    }
    const data = await res.json();
    // A CORREÇÃO ESTÁ AQUI: Voltamos a usar data.data
    // Isso garante que estamos retornando o ARRAY de posts, e não o objeto inteiro.
    return data.data;
  } catch (error) {
    console.error("ERRO AO BUSCAR POSTS:", error);
    return [];
  }
}

// O componente da nossa página (agora acessando post.titulo diretamente)
export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-12">
        Meu Blog com Next.js e Strapi
      </h1>
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Últimos Posts</h2>
        <ul className="space-y-4">
          {posts &&
            posts.map(
              (post: Post) =>
                post && (
                  <li
                    key={post.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block p-6"
                    ></Link>
                    <h3 className="text-2xl font-semibold">{post.titulo}</h3>
                  </li>
                )
            )}
        </ul>
      </div>
    </main>
  );
}
