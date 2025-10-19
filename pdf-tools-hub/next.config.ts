import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "react",
      "react-dom",
      "pdf-lib",
      "react-dropzone",
      "framer-motion",
    ],
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(config);
