import { useRef } from "react";
import styles from "./Slider.module.css";
import { useBoard } from "../../../contexts/BoardContext/BoardContext";
import { useState } from "react";

function Slider({ description, orientation, gridSize }) {
  const { label, min, max, step } = description.state;

  const widgetRef = useRef(null);
  const [value, setValue] = useState(min);
  const { editMode } = useBoard();

  function pointerUp() {
    widgetRef.current.classList.remove(styles.pressed);
  }

  function pointerDown() {
    widgetRef.current.classList.add(styles.pressed);
  }

  return (
    <div
      ref={widgetRef}
      onPointerDown={editMode ? null : pointerDown}
      onPointerUp={editMode ? null : pointerUp}
      className={`widget ${styles.slider} ${
        orientation === "horizontal" ? styles.horizontal : ""
      } ${styles[gridSize]}`}
    >
      <div className={styles.label}>
        <div className={styles.userLabel}>
          {label}
          {orientation === "horizontal" && label ? " • " : null}
        </div>
        <div className={styles.value}>{value}</div>
      </div>
      <input
        min={min || 0}
        max={max || 100}
        step={step || 1}
        value={value}
        onInput={(e) => setValue(e.target.value)}
        type="range"
        style={editMode ? { pointerEvents: "none" } : null}
      />
    </div>
  );
}

export default Slider;
