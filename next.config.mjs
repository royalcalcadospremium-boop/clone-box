/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-**.r2.dev',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '110mb',
    },
  },
}

export default nextConfig
