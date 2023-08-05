import { useState } from "react";
import BaseWidget from "../BaseWidget";
import styles from "./Button.module.css";

function Button({ widget }) {
  const [title, useTitle] = useState("Mute Discord");

  return (
    <BaseWidget className={styles.button}>
      <div>{title}</div>
    </BaseWidget>
  );
}

export default Button;
