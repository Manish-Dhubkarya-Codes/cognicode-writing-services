import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    disableOptimizedLoading: true,
  },
  devIndicators: false,
};

export default nextConfig;