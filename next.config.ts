/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/subscribe",
        destination: "http://localhost:3000/api/subscribe",
      },
    ];
  },
};

module.exports = nextConfig;
