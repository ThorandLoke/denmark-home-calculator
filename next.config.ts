import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: process.env.VERCEL ? '.next' : 'dist',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
