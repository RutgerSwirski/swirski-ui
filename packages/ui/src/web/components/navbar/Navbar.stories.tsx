import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/Button";
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
} from "./index";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Navbar>
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
        <Button className="hidden md:inline-flex" href="/docs" tone="yellow">
          Docs
        </Button>

        <MobileMenu>
          <MobileMenuTrigger className="md:hidden" />
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
              <MobileMenuLink href="/docs">Docs</MobileMenuLink>
            </MobileMenuNav>
          </MobileMenuContent>
        </MobileMenu>
      </NavbarActions>
    </Navbar>
  ),
};
