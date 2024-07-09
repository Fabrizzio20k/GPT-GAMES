/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/images/profile_pictures/**',
      },
      {
        protocol: 'https',
        hostname: '.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'desu-bucket.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
