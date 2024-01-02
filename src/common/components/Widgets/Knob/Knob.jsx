import { useEffect, useRef, useState } from "react";
import styles from "./Knob.module.css";
import { useBoard } from "../../../contexts/BoardContext/BoardContext";
import useResizeObserver from "@react-hook/resize-observer";

const DEAD_ZONE = 10;
const LONG_PRESS_DURATION_MS = 500;
const LONG_PRESS_ALLOWED_MOVEMENT_PX = 5;

function Knob({ description, type, gridSize }) {
  const widgetRef = useRef(null);
  const knobContainerRef = useRef(null);
  const knobRef = useRef(null);
  const [isPointerDown, setPointerDown] = useState(false);
  const { editMode } = useBoard();
  const [timeoutId, setTimeoutId] = useState(null);

  let initialAngle = 0;

  let minDegree, maxDegree;
  let calculateDistance = null;
  if (type === "fixed") {
    let half = description.state.degrees / 2;
    minDegree = 360 - half;
    maxDegree = 0 + half;
    initialAngle = minDegree;

    calculateDistance = (value) => {
      if (value >= minDegree) {
        return value - minDegree;
      } else {
        return value + half;
      }
    };
  }

  const [angle, setAngle] = useState(initialAngle);

  function pointerUp(e) {
    // Clear the previous angle so that the knob doesnt jump
    e.target._lastAngle = undefined;

    // Clear the previous coordinates for detecting long presses
    e.target._coords = undefined;

    // Ignore long press if pointer is up before timeout
    if (type === "fixed") {
      clearTimeout(timeoutId);
      setTimeoutId(false);
    }

    widgetRef.current.classList.remove(styles.pressed);
    setPointerDown(false);
  }

  function pointerDown() {
    // Long pressing resets knob to its initial angle
    if (type === "fixed") {
      let id = setTimeout(() => {
        setAngle(initialAngle);
        console.log("long press");
      }, LONG_PRESS_DURATION_MS);
      setTimeoutId(id);
    }

    widgetRef.current.classList.add(styles.pressed);
    setPointerDown(true);
  }

  function pointerMove(e) {
    // Get the clientX and clientY from the event relative to the event target
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Ignore long press if pointer is up before timeout
    if (type === "fixed") {
      // Compare the current coordinate to the previous
      if (target._coords) {
        const { x, y } = target._coords;
        let deltaX = Math.abs(clientX - x);
        let deltaY = Math.abs(clientY - y);

        // If the pointer has moved too much, ignore long press
        if (
          deltaX > LONG_PRESS_ALLOWED_MOVEMENT_PX ||
          deltaY > LONG_PRESS_ALLOWED_MOVEMENT_PX
        ) {
          // clearTimeout(timeoutId);
          clearTimeout(timeoutId);
          setTimeoutId(false);
        }
      } else {
        target._coords = { x: clientX, y: clientY };
      }
    }

    // Find the coordinates from center
    const fromCenterX = clientX - rect.width / 2;
    const fromCenterY = clientY - rect.height / 2;

    // If the coordinates are within the deadzone, clear the last angle and return
    if (
      Math.abs(fromCenterX) < DEAD_ZONE &&
      Math.abs(fromCenterY) < DEAD_ZONE
    ) {
      target._lastAngle = undefined;
      return;
    }

    // Calculate the angle using Math.atan2
    const angle = Math.atan2(fromCenterY, fromCenterX);

    // Convert the angle from radians to degrees
    let degrees = (angle * 180) / Math.PI;

    // Ensure that the degrees are positive
    degrees = (degrees + 360) % 360;

    // Initialize lastAngle if it's the first call
    if (target._lastAngle === undefined) {
      target._lastAngle = degrees;
    }

    // Calculate the angular delta considering the jump from 359 to 0 degrees
    let delta = degrees - target._lastAngle;

    // Adjust for the jump from 359 to 0 degrees
    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }

    // Update lastAngle for the next call
    target._lastAngle = degrees;

    // console.log(delta);

    setAngle((current) => {
      // console.log(current + delta);
      let newDegree = current + delta;
      if (newDegree < 0) newDegree = 359;
      newDegree = newDegree % 360;

      if (
        type === "fixed" &&
        newDegree <= minDegree &&
        newDegree >= maxDegree
      ) {
        return current;
      }

      return newDegree;
    });

    // console.log(delta);
  }

  useEffect(() => {
    knobRef.current.style.transform = `rotate(${angle}deg)`;
  }, [angle, knobRef]);

  const { label } = description.state;

  useResizeObserver(knobContainerRef.current, (entry) => {
    const { width, height } = entry.target.getBoundingClientRect();
    if (width < height) {
      entry.target.classList.add(styles.heightIsGreater);
      entry.target.classList.remove(styles.widthIsGreater);
    } else {
      entry.target.classList.add(styles.widthIsGreater);
      entry.target.classList.remove(styles.heightIsGreater);
    }
  });

  return (
    <div
      ref={widgetRef}
      className={`widget ${styles.knob} ${styles[gridSize]}`}
      onPointerMove={isPointerDown ? pointerMove : null}
      onPointerDown={editMode ? null : pointerDown}
      onPointerUp={editMode ? null : pointerUp}
      onPointerLeave={pointerUp}
    >
      <div className={styles.knobContainer} ref={knobContainerRef}>
        <div className={styles.actualKnob} ref={knobRef}>
          <span className={type === "free" ? styles.dent : styles.notch}></span>
        </div>
      </div>
      {label ? <div className={styles.label}>{label}</div> : null}
    </div>
  );
}

export default Knob;
