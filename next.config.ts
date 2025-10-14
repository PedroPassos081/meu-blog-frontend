import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // use "https" se for https
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // se hospedar o Strapi, adicione outro pattern aqui
    ],
  },
};

export default nextConfig;
