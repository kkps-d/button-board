import { useBoard } from "../../../contexts/BoardContext/BoardContext";
import fitToContainer from "../../../fitToContainer";
import styles from "./Button.module.css";
import { useEffect, useRef } from "react";

function Button({ description }) {
  const ref = useRef(null);
  const { editMode } = useBoard();

  const { label = "My button", fontSize = "fit" } = description.state;

  const pointerDown = () => {
    if (editMode) return;
    ref.current.classList.add(styles.pressed);
  };

  const pointerUp = () => {
    if (editMode) return;
    ref.current.classList.remove(styles.pressed);
  };

  useEffect(() => {
    if (fontSize == "fit") {
      document.fonts.ready.then(() => fitToContainer(ref.current));
    } else if (fontSize.endsWith("px") || fontSize.endsWith("pt")) {
      ref.current.style.fontSize = fontSize;
    }
  }, [label, fontSize]);

  return (
    <div
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
      ref={ref}
      className={`widget ${styles.button}`}
    >
      {label}
    </div>
  );
}

export default Button;
