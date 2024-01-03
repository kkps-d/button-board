import { useEffect, useState } from "react";
import FlexExpander from "../../../common/components/FlexExpander/FlexExpander";
import styles from "./Nav.module.css";
import NavButton from "./NavButton";
import { useBoard } from "../../../common/contexts/BoardContext/BoardContext";

function Nav() {
  const { boards, selectedBoardIndex, selectBoard } = useBoard();

  return (
    <div className={styles.nav}>
      {boards.map((board, index) => (
        <NavButton
          onClick={() => selectBoard(index)}
          active={selectedBoardIndex === index}
          key={index}
        >
          {board.name}
        </NavButton>
      ))}
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
