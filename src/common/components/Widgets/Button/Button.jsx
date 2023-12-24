import useResizeObserver from "@react-hook/resize-observer";
import { useBoard } from "../../../contexts/BoardContext/BoardContext";
import fitToContainer from "../../../utilities/fitToContainer";
import styles from "./Button.module.css";
import { useEffect, useRef } from "react";

function Button({ description }) {
  const ref = useRef(null);
  const { editMode } = useBoard();

  const { label = "My button", fontSize = "fit" } = description.state;

  function pointerUp() {
    ref.current.classList.remove(styles.pressed);
  }

  function pointerDown() {
    ref.current.classList.add(styles.pressed);
  }

  useEffect(() => {
    if (fontSize == "fit") {
      document.fonts.ready.then(() => fitToContainer(ref.current));
    } else if (fontSize.endsWith("px") || fontSize.endsWith("pt")) {
      ref.current.style.fontSize = fontSize;
    }
  }, [label, fontSize]);

  useResizeObserver(ref, (entry) => {
    if (fontSize == "fit") {
      fitToContainer(ref.current);
    }
  });

  return (
    <div
      onPointerDown={editMode ? null : pointerDown}
      onPointerUp={editMode ? null : pointerUp}
      ref={ref}
      className={`widget ${styles.button}`}
    >
      {label}
    </div>
  );
}

export default Button;
