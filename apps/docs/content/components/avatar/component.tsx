import {
  Avatar,
  AvatarFallback,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const avatarComponentDoc: ComponentDoc = {
  slug: "avatar",
  title: "Avatar",
  description:
    "A framed user image or fallback for accounts, comments and navs.",
  category: "Layout",
  importCode: `import { Avatar, AvatarFallback, AvatarImage } from "@swirski/ui";`,
  usageCode: `<Avatar>
  <AvatarFallback>RS</AvatarFallback>
</Avatar>`,
  preview: (
    <Avatar>
      <AvatarFallback>RS</AvatarFallback>
    </Avatar>
  ),
  props: [
    {
      name: "Avatar",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "Props forwarded to the root avatar.",
    },
    {
      name: "AvatarImage",
      type: "ImgHTMLAttributes<HTMLImageElement>",
      description: "Props forwarded to the image.",
    },
    {
      name: "AvatarFallback",
      type: "HTMLAttributes<HTMLSpanElement>",
      description: "Props forwarded to the fallback.",
    },
  ],
};
