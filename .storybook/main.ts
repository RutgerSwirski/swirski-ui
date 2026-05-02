import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      watch: {
        usePolling: true,
        interval: 100,
      },
    };

    return config;
  },
};

export default config;
