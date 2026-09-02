import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  // Next's file tracing misses sharp's native libvips .so dependency, so the
  // deployed function crashes with ERR_DLOPEN_FAILED unless it's force-included.
  outputFileTracingIncludes: {
    "/api/admin/upload-*": [
      "./node_modules/@img/sharp-linux-x64/**",
      "./node_modules/@img/sharp-libvips-linux-x64/**",
    ],
  },
  async redirects() {
    return [
      { source: "/skills", destination: "/about#skills", permanent: true },
      { source: "/journey", destination: "/about#journey", permanent: true },
      { source: "/competitive-programming", destination: "/cp", permanent: true },
    ];
  },
};

export default nextConfig;
