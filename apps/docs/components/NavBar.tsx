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
  NavbarLink,
  NavbarNav,
  isPathnameActive,
} from "@swirski/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/get-started", label: "Get Started" },
  { href: "/system", label: "System" },
  { href: "/build-component", label: "Build" },
  { href: "/components", label: "Components" },
  { href: "/hooks", label: "Hooks" },
  { href: "/cli", label: "CLI" },
  { href: "/examples", label: "Examples" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarBrand as={Link} href="/">
        Swirski UI
      </NavbarBrand>
      <NavbarNav aria-label="Main navigation">
        {navItems.map((item) => (
          <NavbarLink
            key={item.href}
            as={Link}
            href={item.href}
            active={isPathnameActive(item.href, pathname)}
          >
            {item.label}
          </NavbarLink>
        ))}
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
              {navItems.map((item) => (
                <MobileMenuLink
                  key={item.href}
                  as={Link}
                  href={item.href}
                  active={isPathnameActive(item.href, pathname)}
                >
                  {item.label}
                </MobileMenuLink>
              ))}
            </MobileMenuNav>
          </MobileMenuContent>
        </MobileMenu>
      </NavbarActions>
    </Navbar>
  );
}
