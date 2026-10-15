/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/Public/:path*',
        destination: '/:path*',
      },
      {
        source: '/staff.html',
        destination: '/staff',
      },
    ];
  },
};

export default nextConfig;

