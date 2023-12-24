import { useEffect, useRef, useState } from "react";
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

function keepBetween(num, min, max) {
  return (num % (max - min)) + min;
}

const SCROLL_EDGE_OFFSET = 30; // Buggy, don't change this
const SCROLL_RIDGE_GAP = 20;
const SCROLL_RIDGE_THICKNESS = 2; // Buggy, don't change this
const SCROLL_RIDGE_WIDTH = 0.5; // 1 is full width
const SCROLL_RIDGE_COLOR = "#999";

function Scroll({ description }) {
  const [count, setCount] = useState(0);
  const [isPointerDown, setPointerDown] = useState(false);
  const { editMode } = useBoard();
  const divRef = useRef(null);
  const canvasRef = useRef(null);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [canvasComputedStyle, setCanvasComputedStyle] = useState(null);
  const labelRef = useRef(null);

  function pointerMove(e) {
    let delta = getVerticalDelta(e, 1);
    setCount((current) => (current + delta) % 1000);
  }

  function pointerUp() {
    divRef.current.classList.remove(styles.pressed);
    setPointerDown(false);
  }

  function pointerDown() {
    divRef.current.classList.add(styles.pressed);
    setPointerDown(true);
  }

  useEffect(() => {
    // Gets the context of the current canvas
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
    setCanvasCtx(ctx);
    setCanvasComputedStyle(getComputedStyle(canvasRef.current));
    console.log("canvasRef changed");
  }, [canvasRef]);

  useEffect(() => {
    /**
     * Updates the canvas line color and dimensions
     * When does canvasComputedStyle change?
     * 1. When the canvas changes / is initialized
     * 2. When the canvas is resized (when widget is resized)
     */
    if (!canvasComputedStyle) return;

    let { borderColor, width, height } = canvasComputedStyle;
    let ctx = canvasCtx;

    // Change the line color
    ctx.strokeStyle = borderColor;

    // Update the width and height of the canvas
    canvasRef.current.width = Number(width.slice(0, -2));
    canvasRef.current.height = Number(height.slice(0, -2));
    console.log("canvasComputedStyle changed");
  }, [canvasRef, canvasCtx, canvasComputedStyle]);

  useEffect(() => {
    // The rendering happens here
    if (!canvasComputedStyle) return;

    let { width, height } = canvasComputedStyle;
    let canvasWidth = Number(width.slice(0, -2));
    let canvasHeight = Number(height.slice(0, -2)) + 2 * SCROLL_EDGE_OFFSET;

    // Calculate the number of ridges to draw
    let numRidges = Math.ceil(
      canvasHeight / (SCROLL_RIDGE_THICKNESS + SCROLL_RIDGE_GAP)
    );

    // Calculate the width of the ridges
    let ridgeWidth = Math.round(canvasWidth * SCROLL_RIDGE_WIDTH);

    // Clear canvas and start a new path
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    canvasCtx.beginPath();

    // Change the color and thickness of the path
    canvasCtx.strokeStyle = SCROLL_RIDGE_COLOR;
    canvasCtx.lineWidth = SCROLL_RIDGE_THICKNESS;

    // Calculate where the line starts and ends. This is to center the lines within the canvas.
    // These numbers are applied to the X axis for vertical scroll, and Y axis for horizontal scroll
    let lineStart = canvasWidth / 2 - ridgeWidth / 2;
    let lineEnd = canvasWidth / 2 + ridgeWidth / 2;

    // Start drawing the lines
    for (let i = 0; i < numRidges; i++) {
      // Lines are moved between the minimum and maximum positions to create the illusion of an infinite scroll
      let minHeight = i * SCROLL_RIDGE_GAP - SCROLL_EDGE_OFFSET;
      let maxHeight = (i + 1) * SCROLL_RIDGE_GAP - SCROLL_EDGE_OFFSET;
      let linePosition = keepBetween(count, minHeight, maxHeight);

      canvasCtx.moveTo(lineStart, linePosition);
      canvasCtx.lineTo(lineEnd, linePosition);
      // console.log(minHeight, maxHeight, position);
    }

    canvasCtx.closePath();
    canvasCtx.stroke();
    console.log("rendered");
  }, [count, canvasCtx, canvasComputedStyle]);

  return (
    <div
      className={`widget ${styles.scroll}`}
      onPointerMove={isPointerDown ? pointerMove : null}
      onPointerDown={editMode ? null : pointerDown}
      onPointerUp={editMode ? null : pointerUp}
      onPointerLeave={pointerUp}
      ref={divRef}
    >
      <label ref={labelRef}>{count}</label>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Scroll;
