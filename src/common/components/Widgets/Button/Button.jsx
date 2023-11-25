import styles from "./Button.module.css";
import { useRef } from "react";

function Button({ description }) {
  const ref = useRef(null);

  const pointerDown = () => {
    ref.current.classList.add(styles.pressed);
  };

  const pointerUp = () => {
    ref.current.classList.remove(styles.pressed);
  };

  return (
    <div
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
      ref={ref}
      className={`widget ${styles.button}`}
    >
      Botan!
    </div>
  );
}

export default Button;
