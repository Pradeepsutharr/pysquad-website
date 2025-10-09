/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    modernOutput: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  reactStrictMode: true,
  devIndicators: false,
  productionBrowserSourceMaps: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.calendly.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // custom headers for caching
  async headers() {
    return [
      {
        // Match all static assets (js, css, images, fonts, json)
        source: "/:all*(js|css|jpg|jpeg|gif|png|svg|ico|webp|avif|woff2|json)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
