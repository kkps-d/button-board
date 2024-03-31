import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tab,
  Tabs,
} from "@nextui-org/react";

import {
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import { useState } from "react";
import Logo from "../../../common/components/Logo/Logo";
import LogoCompact from "../../../common/components/LogoCompact/LogoCompact";

function Nav({ darkMode, setDarkMode, onNavOpen }) {
  return (
    <Navbar>
      {/* <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent> */}

      <NavbarContent>
        <Tabs>
          <Tab title="Demo board"></Tab>
          <Tab title="SDVX"></Tab>
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="cursor-pointer">
          <Button
            variant="light"
            isIconOnly={true}
            onClick={() => setDarkMode((mode) => !mode)}
          >
            {darkMode ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </Button>
          <Button variant="light" isIconOnly={true} onClick={onNavOpen}>
            <Cog6ToothIcon className="h-6 w-6" />
          </Button>
          <Button variant="light" isIconOnly={true}>
            <ArrowsPointingOutIcon className="h-6 w-6" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
