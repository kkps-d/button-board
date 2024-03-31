import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { useState } from "react";
import Logo from "../../../common/components/Logo/Logo";

function Nav() {
  const menuItems = [
    { name: "Docs", href: "https://www.wikipedia.org" },
    { name: "Github", href: "https://www.github.com" },
  ];

  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        {menuItems.map((item) => (
          <NavbarItem key={item.name} className="cursor-pointer">
            <Link href={item.href} target="_blank" color="foreground">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="dark">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name} className="cursor-pointer">
            <Link
              className="w-full"
              href={item.href}
              target="_blank"
              color="foreground"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
