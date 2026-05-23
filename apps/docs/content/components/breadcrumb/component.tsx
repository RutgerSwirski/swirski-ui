import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const breadcrumbComponentDoc: ComponentDoc = {
  slug: "breadcrumb",
  title: "Breadcrumb",
  description: "Navigation trail primitives for docs and app pages.",
  category: "Layout",
  importCode: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@swirski/ui";`,
  usageCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  preview: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  props: [
    {
      name: "Breadcrumb",
      type: "HTMLAttributes<HTMLElement>",
      description: "Props forwarded to the nav.",
    },
    {
      name: "BreadcrumbLink",
      type: "AnchorHTMLAttributes<HTMLAnchorElement> & { as?: ElementType }",
      description:
        "Props forwarded to links. Use as to render framework links like Next.js Link.",
    },
    {
      name: "BreadcrumbPage",
      type: "HTMLAttributes<HTMLSpanElement>",
      description: "Current page item.",
    },
  ],
};
