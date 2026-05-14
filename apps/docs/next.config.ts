// apps/docs/next.config.ts

import type { NextConfig } from "next";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(docsDir, "../..");
const uiSource = "../../packages/ui/src/index.ts";
const uiSourceAbsolute = resolve(docsDir, uiSource);

const nextConfig: NextConfig = {
  transpilePackages: ["@swirski/ui"],
  turbopack: {
    root: workspaceRoot,
    resolveAlias: {
      "@swirski/ui": uiSource,
    },
  },
  webpack(config) {
    config.resolve.alias["@swirski/ui"] = uiSourceAbsolute;

    return config;
  },
};

export default nextConfig;
