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
  isPathnameActive,
} from "@swirski/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkItem = {
  href: string;
  label: string;
};

type NavGroupItem = {
  label: string;
  children: NavLinkItem[];
};

type NavItem = NavLinkItem | NavGroupItem;

const navItems: NavItem[] = [
  { href: "/get-started", label: "Get Started" },
  { href: "/components", label: "Components" },
  { href: "/hooks", label: "Hooks" },

  {
    label: "Nerd stuff!",
    children: [
      {
        href: "/system",
        label: "System",
      },
      {
        href: "/cli",
        label: "CLI",
      },
      {
        href: "/build-component",
        label: "Build a component",
      },
    ],
  },
  // { href: "/examples", label: "Examples" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarBrand as={Link} href="/">
        Swirski UI
      </NavbarBrand>
      <NavbarNav aria-label="Main navigation">
        {navItems.map((item) => {
          if ("children" in item) {
            const active = item.children.some((childItem) =>
              isPathnameActive(childItem.href, pathname),
            );

            return (
              <NavbarDropdown key={item.label}>
                <NavbarDropdownTrigger active={active}>
                  {item.label}
                </NavbarDropdownTrigger>
                <NavbarDropdownContent align="end">
                  {item.children.map((childItem) => (
                    <NavbarDropdownLink
                      key={childItem.href}
                      as={Link}
                      href={childItem.href}
                      active={isPathnameActive(childItem.href, pathname)}
                    >
                      {childItem.label}
                    </NavbarDropdownLink>
                  ))}
                </NavbarDropdownContent>
              </NavbarDropdown>
            );
          }

          return (
            <NavbarLink
              key={item.href}
              as={Link}
              href={item.href}
              active={isPathnameActive(item.href, pathname)}
            >
              {item.label}
            </NavbarLink>
          );
        })}
      </NavbarNav>
      <NavbarActions className="md:hidden">
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
              {navItems.map((item) =>
                "children" in item ? (
                  <div
                    key={item.label}
                    className="grid gap-3 border-t-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] pt-4 first:border-t-0 first:pt-0"
                  >
                    <p className="px-1 text-xs font-black uppercase text-[var(--sw-color-muted)]">
                      {item.label}
                    </p>
                    {item.children.map((itemChild) => (
                      <MobileMenuLink
                        key={itemChild.href}
                        as={Link}
                        href={itemChild.href}
                        active={isPathnameActive(itemChild.href, pathname)}
                      >
                        {itemChild.label}
                      </MobileMenuLink>
                    ))}
                  </div>
                ) : (
                  <MobileMenuLink
                    key={item.href}
                    as={Link}
                    href={item.href}
                    active={isPathnameActive(item.href, pathname)}
                  >
                    {item.label}
                  </MobileMenuLink>
                ),
              )}
            </MobileMenuNav>
          </MobileMenuContent>
        </MobileMenu>
      </NavbarActions>
    </Navbar>
  );
}
