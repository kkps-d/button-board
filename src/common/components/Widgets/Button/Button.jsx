import WidgetBase from "../WidgetBase/WidgetBase";
import styles from "./Button.module.css";

function Button({ description }) {
  const pointerDown = (elm) => {
    elm.classList.add(styles.pressed);
  };

  const pointerUp = (elm) => {
    elm.classList.remove(styles.pressed);
  };

  return (
    <WidgetBase
      className={styles.button}
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
    >
      Botan!
    </WidgetBase>
  );
}

export default Button;
