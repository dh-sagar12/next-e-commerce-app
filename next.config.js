/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseURL: 'http://127.0.0.1:8000',
    SITE_URL: 'http://localhost:3000'
  },
  images: {
    domains: ['127.0.0.1'],
  },

}


module.exports = nextConfig
