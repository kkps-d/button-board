import styles from "./Label.module.css";
import * as Descriptions from "../Descriptions.js";
import { useEffect, useLayoutEffect, useRef } from "react";
import fitToContainer from "../../../fitToContainer.js";

/**
 * Label widget
 * @param {Object} props
 * @param {Descriptions.Label} props.description
 * @returns
 */
function Label({ description }) {
  const ref = useRef(null);

  const {
    label = "A label",
    fontSize = "fit",
    align = "center",
    showBorders = true,
  } = description.state;

  let alignItems;
  switch (align) {
    case "left":
      alignItems = "start";
      break;
    case "right":
      alignItems = "end";
      break;
    case "center":
      alignItems = "center";
      break;
  }

  useEffect(() => {
    if (fontSize == "fit") {
      document.fonts.ready.then(() => fitToContainer(ref.current));
    } else if (fontSize.endsWith("px") || fontSize.endsWith("pt")) {
      ref.current.style.fontSize = fontSize;
    }
  }, [label, fontSize]);

  return (
    <div
      ref={ref}
      style={{
        textAlign: align,
        alignItems: alignItems,
        borderColor: `${
          showBorders ? "var(--color-widget-border)" : "transparent"
        }`,
      }}
      className={`widget ${styles.label}`}
    >
      {label}
    </div>
  );
}

export default Label;
