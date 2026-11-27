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
import { useEffect, useState } from "react";
import { DocsThemeToggle } from "./DocsTheme";

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
  { href: "/native", label: "Native" },
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Navbar>
      <NavbarBrand as={Link} href="/">
        Swirski UI
      </NavbarBrand>
      <NavbarNav aria-label="Main navigation" className="md:hidden! lg:flex!">
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
      <NavbarActions>
        <div className="hidden lg:block!">
          <DocsThemeToggle />
        </div>
        <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen}>
          <div className="lg:hidden">
            <MobileMenuTrigger />
          </div>
          <MobileMenuContent>
            <MobileMenuHeader>
              <MobileMenuTitle>Menu</MobileMenuTitle>
              <MobileMenuClose aria-label="Close navigation menu">
                x
              </MobileMenuClose>
            </MobileMenuHeader>
            <div className="shrink-0 pt-2 pb-5">
              <DocsThemeToggle mobile />
            </div>
            <MobileMenuNav aria-label="Mobile navigation" className="min-h-0 overflow-y-auto px-1">
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
