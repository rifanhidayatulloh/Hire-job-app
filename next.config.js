/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'hirejob-web-app.herokuapp.com',
      'unsplash.com',
      'images.unsplash.com',
      'drive.google.com',
      'postimg.cc',
      'i.postimg.cc'
    ]
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.BACKEND_URL
  }
};

module.exports = nextConfig;
