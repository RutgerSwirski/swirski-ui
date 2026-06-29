import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../../src/native/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  viteFinal: async (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "react-native": "react-native-web",
        },
      },
      server: {
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      optimizeDeps: {
        include: ["react-native-web"],
      },
    }),
};

export default config;
