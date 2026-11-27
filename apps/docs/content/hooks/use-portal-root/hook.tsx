import { Badge } from "@swirski/ui";
import type { HookDoc } from "../../types";

export const usePortalRootHookDoc: HookDoc = {
  slug: "use-portal-root",
  title: "usePortalRoot",
  description:
    "Returns the nearest SwirskiProvider portal host after mount, or the document body outside a provider.",
  category: "Hooks",
  importCode: `import { usePortalRoot } from "@swirski/ui";`,
  usageCode: `const portalRoot = usePortalRoot();`,

  returns: [
    {
      name: "portalRoot",
      type: "HTMLElement",
      description: "Root element to use for portals.",
    },
  ],
};
