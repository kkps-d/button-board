import { useEffect, useState } from "react";
import FlexExpander from "../../../common/components/FlexExpander";
import styles from "./Nav.module.css";
import NavButton from "./NavButton";

function Nav() {
  return (
    <div className={styles.nav}>
      <NavButton>1</NavButton>
      <NavButton>2</NavButton>
      <NavButton>3</NavButton>
      <FlexExpander />
      <FullscreenButton />
      <NavButton>Settings</NavButton>
    </div>
  );
}

function FullscreenButton() {
  const [isFullscreen, setFullscreen] = useState(
    document.fullscreenElement != null
  );

  useEffect(() => {
    function handleFullScreenChange() {
      setFullscreen((prevState) => !prevState);
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  return (
    <NavButton
      onClick={() => {
        if (isFullscreen) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }}
    >
      {isFullscreen ? "Exit\nFullscreen" : "Go\nFullscreen"}
    </NavButton>
  );
}

export default Nav;
