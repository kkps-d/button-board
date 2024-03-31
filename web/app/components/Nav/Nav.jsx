import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  Tab,
  Tabs,
} from "@nextui-org/react";

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function Nav({ darkMode, setDarkMode, onNavOpen }) {
  const [isFullscreen, setFullscreen] = useState(
    document.fullscreenElement != null
  );

  function onSetFullscreen() {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    function handleFullScreenChange() {
      console.log("Fullscreen");
      setFullscreen((prevState) => !prevState);
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  return (
    <Navbar>
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
          <Button variant="light" isIconOnly={true} onClick={onSetFullscreen}>
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-6 w-6" />
            ) : (
              <ArrowsPointingOutIcon className="h-6 w-6" />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
