import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'sbxqe6uvicryn85x.public.blob.vercel-storage.com'
    }]
  }
};

export default nextConfig;
