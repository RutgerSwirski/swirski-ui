"use client";

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
import type { PlaygroundDefinition } from "../../types";
import {
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

const primaryItems = ["Components", "Hooks"] as const;
const dropdownItems = ["System", "CLI"] as const;

function isDropdownActive(activeItem: string) {
  return dropdownItems.some((item) => item === activeItem);
}

export const navbarPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "brand",
      label: "brand",
      type: "text",
      defaultValue: "Swirski UI",
    },
    {
      name: "active",
      label: "active",
      type: "select",
      defaultValue: "Components",
      options: ["Components", "Hooks", "System", "CLI"],
    },
    {
      name: "mobileOpen",
      label: "mobileOpen",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "mobileSide",
      label: "mobileSide",
      type: "select",
      defaultValue: "right",
      options: ["left", "right"],
    },
  ],
  render: (values) => (
    <Navbar className="w-full border-[length:var(--sw-border-width)] bg-white">
      <NavbarBrand href="#preview">{textValue(values, "brand")}</NavbarBrand>
      <NavbarNav aria-label="Playground navigation">
        {primaryItems.map((item) => (
          <NavbarLink
            active={textValue(values, "active") === item}
            href="#preview"
            key={item}
          >
            {item}
          </NavbarLink>
        ))}
        <NavbarDropdown>
          <NavbarDropdownTrigger
            active={isDropdownActive(textValue(values, "active"))}
          >
            More
          </NavbarDropdownTrigger>
          <NavbarDropdownContent align="end">
            {dropdownItems.map((item) => (
              <NavbarDropdownLink
                active={textValue(values, "active") === item}
                href="#preview"
                key={item}
              >
                {item}
              </NavbarDropdownLink>
            ))}
          </NavbarDropdownContent>
        </NavbarDropdown>
      </NavbarNav>
      <NavbarActions>
        <MobileMenu
          key={`${booleanValue(values, "mobileOpen")}-${textValue(values, "mobileSide")}`}
          defaultOpen={booleanValue(values, "mobileOpen")}
        >
          <MobileMenuTrigger />
          <MobileMenuContent
            side={textValue(values, "mobileSide") as "left" | "right"}
          >
            <MobileMenuHeader>
              <MobileMenuTitle>Menu</MobileMenuTitle>
              <MobileMenuClose aria-label="Close navigation menu">
                x
              </MobileMenuClose>
            </MobileMenuHeader>
            <MobileMenuNav aria-label="Mobile playground navigation">
              {[...primaryItems, ...dropdownItems].map((item) => (
                <MobileMenuLink
                  active={textValue(values, "active") === item}
                  href="#preview"
                  key={item}
                >
                  {item}
                </MobileMenuLink>
              ))}
            </MobileMenuNav>
          </MobileMenuContent>
        </MobileMenu>
      </NavbarActions>
    </Navbar>
  ),
  getCode: (values) => `<Navbar>
  <NavbarBrand href="/">${jsxText(textValue(values, "brand"))}</NavbarBrand>
  <NavbarNav aria-label="Main navigation">
    <NavbarLink href="/components"${textValue(values, "active") === "Components" ? " active" : ""}>Components</NavbarLink>
    <NavbarLink href="/hooks"${textValue(values, "active") === "Hooks" ? " active" : ""}>Hooks</NavbarLink>
    <NavbarDropdown>
      <NavbarDropdownTrigger${isDropdownActive(textValue(values, "active")) ? " active" : ""}>More</NavbarDropdownTrigger>
      <NavbarDropdownContent align="end">
        <NavbarDropdownLink href="/system"${textValue(values, "active") === "System" ? " active" : ""}>System</NavbarDropdownLink>
        <NavbarDropdownLink href="/cli"${textValue(values, "active") === "CLI" ? " active" : ""}>CLI</NavbarDropdownLink>
      </NavbarDropdownContent>
    </NavbarDropdown>
  </NavbarNav>
</Navbar>`,
};
