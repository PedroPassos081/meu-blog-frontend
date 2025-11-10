// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Ambiente local (Strapi rodando em http://localhost:1337)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Strapi Cloud (seu projeto)
      {
        protocol: "https",
        hostname: "playful-unity-868528a03e.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
