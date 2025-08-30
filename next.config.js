/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: '.next',
    images: {
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
  };

  export default nextConfig;
