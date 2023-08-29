/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["uploadthing.com", "cdn.truyen-hentai.com"],
  },
};

module.exports = nextConfig;
