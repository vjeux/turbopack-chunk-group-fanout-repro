import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // FS_CACHE=0 builds with the filesystem cache off, for comparison.
    turbopackFileSystemCacheForBuild: process.env.FS_CACHE !== "0",
  },
};

export default nextConfig;
