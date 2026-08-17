import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/skills", destination: "/about#skills", permanent: true },
      { source: "/journey", destination: "/about#journey", permanent: true },
      { source: "/competitive-programming", destination: "/cp", permanent: true },
    ];
  },
};

export default nextConfig;
