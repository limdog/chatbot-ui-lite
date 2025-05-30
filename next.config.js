// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // or allow specific domains with CSP
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://flipsideai.au/" // replace with your WordPress domain
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
