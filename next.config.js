const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL"
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://flipsideai.au" // replace with your exact domain
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
