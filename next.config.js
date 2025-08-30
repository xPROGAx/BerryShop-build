/** @type {import('next').NextConfig} */
const nextConfig = {
  // УБРАТЬ output: 'export' - так как есть API routes
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
  }
};

export default nextConfig;
