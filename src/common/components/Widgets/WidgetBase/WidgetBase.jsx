import { useEffect, useRef } from "react";
import styles from "./WidgetBase.module.css";

function WidgetBase({
  className = "",
  onPointerUp = () => {},
  onPointerDown = () => {},
  onClick = () => {},
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const elm = ref.current;

    const pointerDown = () => {
      onPointerDown(elm);
    };

    const pointerUp = () => {
      onPointerUp(elm);
    };

    const click = () => {
      onClick(elm);
    };

    elm.addEventListener("pointerdown", pointerDown);
    elm.addEventListener("pointerup", pointerUp);
    elm.addEventListener("click", click);

    return () => {
      elm.removeEventListener("pointerdown", pointerDown);
      elm.removeEventListener("pointerup", pointerUp);
      elm.removeEventListener("click", click);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.widget} ${className}`}>
      {children}
    </div>
  );
}

export default WidgetBase;
