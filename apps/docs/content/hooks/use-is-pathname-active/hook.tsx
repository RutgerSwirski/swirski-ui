import { Badge } from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useIsPathnameActiveHookDoc: HookDoc = {
  slug: "use-is-pathname-active",
  title: "useIsPathnameActive",
  description:
    "Checks whether a pathname matches the current URL path, including nested routes.",
  category: "Hooks",
  importCode: `import { useIsPathnameActive } from "@swirski/ui";`,
  usageCode: `const active = useIsPathnameActive(
  "/components",
  "/components/button",
);`,
  preview: <Badge tone="blue">Active route helper</Badge>,
  props: [
    {
      name: "pathname",
      type: "string | URL",
      required: true,
      description: "Target pathname or URL to match.",
    },
    {
      name: "currentUrl",
      type: "string | URL",
      required: true,
      description: "Current route URL or pathname.",
    },
    {
      name: "options.exact",
      type: "boolean",
      defaultValue: "false",
      description: "Require an exact pathname match.",
    },
  ],
  returns: [
    {
      name: "active",
      type: "boolean",
      description:
        "True when currentUrl matches pathname or a nested child path.",
    },
  ],
};
