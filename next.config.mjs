/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Re-enabled image optimization for better performance
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
  // Disable static optimization for the 404 page
  staticPageGenerationTimeout: 1000,
  // Force dynamic rendering for error pages
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
