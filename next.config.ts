// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Strapi local (quando usar localhost)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Domínio do seu Strapi Cloud (API/admin pode servir assets também)
      {
        protocol: "https",
        hostname: "playful-unity-868528a03e.strapiapp.com",
        pathname: "/**", // aceita qualquer caminho
      },
      // Domínio de mídia do Strapi Cloud (onde sua imagem está)
      {
        protocol: "https",
        hostname: "playful-unity-868528a03e.media.strapiapp.com",
        pathname: "/**", // importante: aqui não há /uploads
      },
    ],
  },
};

export default nextConfig;
