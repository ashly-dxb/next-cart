/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // MONGODB_URI: process.env.MONGODB_URI,
    // DOMAIN_HOST: process.env.DOMAIN_HOST,
    // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // AUTH_SECRET: process.env.AUTH_SECRET,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
