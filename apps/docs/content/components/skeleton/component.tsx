import {
  Grid,
  Skeleton,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const skeletonComponentDoc: ComponentDoc = {
  slug: "skeleton",
  title: "Skeleton",
  description: "A placeholder block for loading layouts.",
  category: "Feedback",
  importCode: `import { Skeleton } from "@swirski/ui";`,
  usageCode: `<Skeleton className="h-24 w-full" />`,
  preview: (
    <Grid gap="sm" className="max-w-sm">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-24 w-full" />
    </Grid>
  ),
  props: [
    {
      name: "className",
      type: "string",
      description: "Controls the skeleton size and extra styling.",
    },
    {
      name: "...divProps",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "Forwarded to the root div.",
    },
  ],
};
