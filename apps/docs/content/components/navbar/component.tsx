import {
  MobileMenu,
  MobileMenuClose,
  MobileMenuContent,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuTitle,
  MobileMenuTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarDropdown,
  NavbarDropdownContent,
  NavbarDropdownLink,
  NavbarDropdownTrigger,
  NavbarLink,
  NavbarNav,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const navbarComponentDoc: ComponentDoc = {
  slug: "navbar",
  title: "Navbar",
  description:
    "Composable header primitives with a reusable hamburger menu for mobile navigation.",
  category: "Layout",
  importCode: `import {
  MobileMenu,
  MobileMenuContent,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarDropdown,
  NavbarDropdownContent,
  NavbarDropdownLink,
  NavbarDropdownTrigger,
  NavbarLink,
  NavbarNav,
} from "@swirski/ui";`,
  usageCode: `<Navbar>
  <NavbarBrand href="/">Swirski UI</NavbarBrand>
  <NavbarNav aria-label="Main navigation">
    <NavbarLink href="/components" active>Components</NavbarLink>
    <NavbarLink href="/hooks">Hooks</NavbarLink>
    <NavbarDropdown>
      <NavbarDropdownTrigger>Nerd Stuff</NavbarDropdownTrigger>
      <NavbarDropdownContent align="end">
        <NavbarDropdownLink href="/system">System</NavbarDropdownLink>
        <NavbarDropdownLink href="/cli">CLI</NavbarDropdownLink>
        <NavbarDropdownLink href="/build-component">Build a component</NavbarDropdownLink>
      </NavbarDropdownContent>
    </NavbarDropdown>
  </NavbarNav>
  <NavbarActions>
    <MobileMenu>
      <MobileMenuTrigger />
      <MobileMenuContent>
        <MobileMenuNav aria-label="Mobile navigation">
          <MobileMenuLink href="/components" active>Components</MobileMenuLink>
          <MobileMenuLink href="/hooks">Hooks</MobileMenuLink>
          <MobileMenuLink href="/cli">CLI</MobileMenuLink>
        </MobileMenuNav>
      </MobileMenuContent>
    </MobileMenu>
  </NavbarActions>
</Navbar>`,
  compositionCode: `Navbar
|-- NavbarBrand
|-- NavbarNav
|   |-- NavbarLink
|   \`-- NavbarDropdown
|       |-- NavbarDropdownTrigger
|       |-- NavbarDropdownContent
|       \`-- NavbarDropdownLink
\`-- NavbarActions
    \`-- MobileMenu
        |-- MobileMenuTrigger
        \`-- MobileMenuContent
            |-- MobileMenuHeader
            |   |-- MobileMenuTitle
            |   \`-- MobileMenuClose
            \`-- MobileMenuNav
                \`-- MobileMenuLink`,
  preview: (
    <Navbar className="w-full border-[length:var(--sw-border-width)] bg-white">
      <NavbarBrand href="/">Swirski UI</NavbarBrand>
      <NavbarNav aria-label="Main navigation">
        <NavbarLink href="/components" active>
          Components
        </NavbarLink>
        <NavbarLink href="/hooks">Hooks</NavbarLink>
        <NavbarDropdown>
          <NavbarDropdownTrigger>Nerd Stuff</NavbarDropdownTrigger>
          <NavbarDropdownContent align="end">
            <NavbarDropdownLink href="/system">System</NavbarDropdownLink>
            <NavbarDropdownLink href="/cli">CLI</NavbarDropdownLink>
            <NavbarDropdownLink href="/build-component">
              Build a component
            </NavbarDropdownLink>
          </NavbarDropdownContent>
        </NavbarDropdown>
      </NavbarNav>
      <NavbarActions>
        <MobileMenu>
          <MobileMenuTrigger />
          <MobileMenuContent>
            <MobileMenuHeader>
              <MobileMenuTitle>Menu</MobileMenuTitle>
              <MobileMenuClose aria-label="Close navigation menu">
                x
              </MobileMenuClose>
            </MobileMenuHeader>
            <MobileMenuNav aria-label="Mobile navigation">
              <MobileMenuLink href="/components" active>
                Components
              </MobileMenuLink>
              <MobileMenuLink href="/hooks">Hooks</MobileMenuLink>
              <MobileMenuLink href="/cli">CLI</MobileMenuLink>
            </MobileMenuNav>
          </MobileMenuContent>
        </MobileMenu>
      </NavbarActions>
    </Navbar>
  ),
  props: [
    {
      name: "Navbar",
      type: "HTMLAttributes<HTMLElement>",
      description: "Props forwarded to the root header.",
    },
    {
      name: "NavbarBrand",
      type: "AnchorHTMLAttributes<HTMLAnchorElement>",
      description: "Props forwarded to the brand link.",
    },
    {
      name: "NavbarNav",
      type: "HTMLAttributes<HTMLElement>",
      description: "Props forwarded to the desktop nav.",
    },
    {
      name: "NavbarLink.active",
      type: "boolean",
      defaultValue: "false",
      description: "Marks a link as the current page.",
    },
    {
      name: "NavbarDropdownTrigger.active",
      type: "boolean",
      defaultValue: "false",
      description: "Styles the dropdown trigger as active.",
    },
    {
      name: "NavbarDropdownContent.align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Aligns the dropdown panel to the trigger.",
    },
    {
      name: "NavbarDropdownLink.active",
      type: "boolean",
      defaultValue: "false",
      description: "Marks a dropdown link as the current page.",
    },
    {
      name: "MobileMenu.open",
      type: "boolean",
      description: "Controlled mobile menu open state.",
    },
    {
      name: "MobileMenu.defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial uncontrolled open state.",
    },
    {
      name: "MobileMenuContent.side",
      type: '"left" | "right"',
      defaultValue: '"right"',
      description: "Side used for the menu panel.",
    },
    {
      name: "MobileMenuLink.closeOnSelect",
      type: "boolean",
      defaultValue: "true",
      description: "Closes the menu after a link is selected.",
    },
  ],
};
