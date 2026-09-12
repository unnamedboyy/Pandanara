/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://cvftdyrkietggjblkjjv.supabase.co", // ganti dengan project ref kamu
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;