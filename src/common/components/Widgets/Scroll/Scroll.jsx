import { useRef, useState } from "react";
import styles from "./Scroll.module.css";
import { useBoard } from "../../../contexts/BoardContext/BoardContext";

function getVerticalDelta(event, sensitivity = 1) {
  // Check if the event has pointer coordinates
  if (event.clientY !== undefined) {
    // Calculate the delta of vertical pointer movement since the last move event
    const deltaY =
      (event.movementY !== undefined
        ? event.movementY
        : event.clientY -
          (event.targetTouches ? event.targetTouches[0].clientY : 0)) *
      sensitivity;

    return deltaY;
  }
}

function getHorizontalDelta(event, sensitivity = 1) {
  // Check if the event has pointer coordinates
  if (event.clientX !== undefined) {
    // Calculate the delta of horizontal pointer movement since the last move event
    const deltaX =
      (event.movementX !== undefined
        ? event.movementX
        : event.clientX -
          (event.targetTouches ? event.targetTouches[0].clientX : 0)) *
      sensitivity;

    return deltaX;
  }
}

function Scroll({ description }) {
  const [direction, setDirection] = useState(null);
  const [isPointerDown, setPointerDown] = useState(false);
  const { editMode } = useBoard();
  const ref = useRef(null);

  function pointerMove(e) {
    let delta = getVerticalDelta(e);
    if (delta < 0) {
      setDirection("up");
    } else if (delta > 0) {
      setDirection("down");
    } else {
      setDirection("none");
    }
  }

  function pointerUp() {
    setPointerDown(false);
  }

  function pointerDown() {
    setPointerDown(true);
  }

  return (
    <div
      className={`widget ${styles.scroll}`}
      onPointerMove={isPointerDown ? pointerMove : null}
      onPointerDown={editMode ? null : pointerDown}
      onPointerUp={editMode ? null : pointerUp}
      onPointerLeave={pointerUp}
      ref={ref}
    >
      {direction}
    </div>
  );
}

export default Scroll;
