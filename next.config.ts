import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (smallest), fall back to WebP, then the original JPEG.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
