/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  images: {
    domains:['places.googleapis.com', 'example.com','maps.googleapis.com', 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
