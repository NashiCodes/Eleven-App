/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        elevenLabsKey: process.env.XI_API_KEY, // pulls from .env file
    },

};

export default nextConfig;
