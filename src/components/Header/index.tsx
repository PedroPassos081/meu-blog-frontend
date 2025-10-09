// ARQUIVO: src/components/Header.tsx

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Meu Portfólio
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/projetos" className="text-gray-600 hover:text-blue-600">
            Projetos
          </Link>
          <Link href="/sobre" className="text-gray-600 hover:text-blue-600">
            Sobre
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600">
            Blog
          </Link>
          <Link href="/contato" className="text-gray-600 hover:text-blue-600">
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
}
