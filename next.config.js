/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Критически важно для статического экспорта
  trailingSlash: true, // Рекомендуется для статического хостинга
  distDir: 'out', // Явно указываем папку для сборки
  
  images: {
    unoptimized: true, // Обязательно для статического экспорта
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

  // Опционально: если нужны дополнительные настройки
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  
  // Для отключения функций, которые не работают со статическим экспортом
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
