import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // @ts-ignore
  devIndicators: false,
  images: {
    unoptimized: true,
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
