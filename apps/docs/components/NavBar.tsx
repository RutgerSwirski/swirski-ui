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
} from "@swirski/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/components", label: "Components" },
  { href: "/hooks", label: "Hooks" },
  { href: "/cli", label: "CLI" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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
            active={isActivePath(pathname, item.href)}
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
                  active={isActivePath(pathname, item.href)}
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
