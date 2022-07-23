/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: { domains: ["images.pexels.com", "lh3.googleusercontent.com"] },
};

module.exports = nextConfig;
