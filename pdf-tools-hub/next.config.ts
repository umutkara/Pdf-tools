import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  // Remove experimental optimizePackageImports to avoid webpack-runtime errors in prod build
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(config);
