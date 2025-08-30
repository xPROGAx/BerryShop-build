/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jlihetezqlvilhysgsxi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '**'
      }
    ],
  },

  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

};

export default nextConfig;
