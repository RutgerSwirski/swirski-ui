// apps/docs/next.config.ts

import type { NextConfig } from "next";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(docsDir, "../..");
const uiSource = "../../packages/ui/src/index.ts";
const uiSourceAbsolute = resolve(docsDir, uiSource);
const uiStylesAbsolute = resolve(workspaceRoot, "packages/ui/dist/styles.css");

const nextConfig: NextConfig = {
  transpilePackages: ["@swirski/ui"],
  turbopack: {
    root: workspaceRoot,
    resolveAlias: {
      "@swirski/ui/styles.css": uiStylesAbsolute,
      "@swirski/ui": uiSource,
    },
  },
  webpack(config) {
    config.resolve.alias["@swirski/ui$"] = uiSourceAbsolute;
    config.resolve.alias["@swirski/ui/styles.css"] = uiStylesAbsolute;

    return config;
  },
};

export default nextConfig;
