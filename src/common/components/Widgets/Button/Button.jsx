import useResizeObserver from "@react-hook/resize-observer";
import { useBoard } from "../../../contexts/BoardContext/BoardContext";
import fitToContainer from "../../../utilities/fitToContainer";
import styles from "./Button.module.css";
import { useEffect, useRef, useState } from "react";

function Button({ description, type = "button" }) {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const [toggled, setToggled] = useState(false);
  const { editMode } = useBoard();

  const {
    label = "My button",
    labelToggled = "Toggled",
    toggleOnColor = "white",
    toggleOffColor = "var(--color-widget-background)",
    fontSize = "fit",
  } = description.state;

  function pointerUp() {
    ref.current.classList.remove(styles.pressed);
  }

  function pointerDown() {
    ref.current.classList.add(styles.pressed);
  }

  function onClick() {
    setToggled((current) => !current);
  }

  useEffect(() => {
    if (fontSize == "fit") {
      document.fonts.ready.then(() => fitToContainer(labelRef.current));
    } else if (fontSize.endsWith("px") || fontSize.endsWith("pt")) {
      ref.current.style.fontSize = fontSize;
    }
  }, [label, fontSize, toggled]);

  useResizeObserver(labelRef, (entry) => {
    if (fontSize == "fit") {
      fitToContainer(labelRef.current);
    }
  });

  return (
    <div
      onPointerDown={editMode ? null : pointerDown}
      onPointerUp={editMode ? null : pointerUp}
      onClick={onClick}
      ref={ref}
      className={`widget ${styles.button} ${
        type === "toggle" ? styles.toggle : ""
      }`}
    >
      <div ref={labelRef} className={styles.label}>
        {type === "toggle" ? (toggled ? labelToggled : label) : label}
      </div>
      {type === "toggle" ? (
        <div
          style={{ backgroundColor: toggled ? toggleOnColor : toggleOffColor }}
          className={styles.indicator}
        ></div>
      ) : null}
    </div>
  );
}

export default Button;
