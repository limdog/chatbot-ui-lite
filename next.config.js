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
            value: "frame-ancestors https://flipsideai.au"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
