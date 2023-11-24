import { useEffect, useRef } from "react";
import styles from "./WidgetBase.module.css";

function WidgetBase({ className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const elm = ref.current;

    const pointerDown = () => {
      elm.classList.add("pressed");
    };

    const pointerUp = () => {
      elm.classList.remove("pressed");
    };

    elm.addEventListener("pointerdown", pointerDown);

    elm.addEventListener("pointerup", pointerUp);

    return () => {
      elm.removeEventListener("pointerdown", pointerDown);
      elm.removeEventListener("pointerup", pointerUp);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.widget} ${className}`}>
      {children}
    </div>
  );
}

export default WidgetBase;
