import {
  ImageFrame,
  Title,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const imageFrameComponentDoc: ComponentDoc = {
  slug: "image-frame",
  title: "ImageFrame",
  description:
    "A framed media primitive for screenshots, product shots, visual examples and editorial layouts.",
  category: "Media",
  importCode: `import { ImageFrame } from "@swirski/ui";`,
  usageCode: `<ImageFrame caption="Studio proof" tone="paper">
  <img src="/preview.jpg" alt="Preview" />
</ImageFrame>`,
  preview: (
    <ImageFrame
      caption="Studio proof"
      className="aspect-[4/3] w-full max-w-sm"
      tone="paper"
    >
      <div className="flex h-full items-center justify-center bg-[#0057FF] p-8 text-white">
        <Title order={3} size="h4" tone="inverted">
          SWIRSKI
        </Title>
      </div>
    </ImageFrame>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Media or visual content rendered inside the frame.",
    },
    {
      name: "caption",
      type: "ReactNode",
      description: "Optional caption pinned inside the frame.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Sets the Swirski size data attribute.",
    },
    {
      name: "tone",
      type: '"paper" | "white" | "black"',
      defaultValue: '"paper"',
      description: "Applies the frame background and text treatment.",
    },
    {
      name: "variant",
      type: '"default" | "plain"',
      defaultValue: '"default"',
      description: "Toggles the border and offset shadow treatment.",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the child as the root element.",
    },
    {
      name: "...divProps",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "Forwarded to the rendered frame.",
    },
  ],
};
