import type { Preview } from "@storybook/react-vite";
import { View } from "react-native";
import "../../src/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <View
        style={{
          alignItems: "flex-start",
          backgroundColor: "#f5f5f3",
          flex: 1,
          minHeight: "100vh",
          padding: 24,
        }}
      >
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default preview;
