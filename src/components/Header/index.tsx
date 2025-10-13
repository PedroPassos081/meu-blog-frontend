// ARQUIVO: src/components/Header/index.tsx

import Link from "next/link";

export default function Header() {
  return (
    // Adicionamos um fundo branco e uma sombra suave
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Usamos Flexbox para alinhar tudo:
        - mx-auto e px-6: Centraliza e dá margens laterais
        - flex, justify-between, items-center: Alinha os itens com espaço entre eles
      */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo (pode ser substituído por uma imagem no futuro) */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-opacity-80 transition-colors"
        >
          VET Dev
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-text-main hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className="text-text-main hover:text-primary transition-colors"
          >
            Sobre Nós
          </Link>
          <Link
            href="/servicos"
            className="text-text-main hover:text-primary transition-colors"
          >
            Serviços
          </Link>
          <Link
            href="/blog"
            className="text-text-main hover:text-primary transition-colors"
          >
            Blog
          </Link>

          {/* Botão de Destaque (Call to Action) */}
          <Link
            href="/contato"
            className="bg-accent text-white font-bold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Contato
          </Link>
        </div>

        {/* Adicionar um botão de menu para mobile no futuro */}
        <div className="md:hidden">
          {/* Botão de Menu Mobile (ainda não funcional) */}
          <button className="text-text-main">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
