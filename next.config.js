/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://njht.vercel.app",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["api.mapbox.com"],
  },
};

module.exports = nextConfig;
