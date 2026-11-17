import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  experimental: {
    // Solo carga los íconos que se usan
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // www.ipucfb.com → ipucfb.com (una sola URL para Google y para compartir)
  async redirects() {
    return [
      // Subdominio «falso»: jovenes.ipucfb.com → ipucfb.com/jovenes
      {
        source: "/:path*",
        has: [{ type: "host", value: "jovenes.ipucfb.com" }],
        destination: "https://ipucfb.com/jovenes",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ipucfb.com" }],
        destination: "https://ipucfb.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
