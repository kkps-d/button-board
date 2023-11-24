import ReactGridLayout from "react-grid-layout";
import styles from "./BoardContainer.module.css";
import { useEffect, useRef } from "react";
import createWidget from "../CreateWidget";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const GRID_SIZES = {
  small: 80,
  medium: 90,
  large: 100,
};
const GRID_GUTTER = 10;

let EDIT = false;
let GRID_SIZE = GRID_SIZES["large"];
let COLS = 9;
let ROWS = 6;

let device = {
  name: "tab s7",
  gridSize: "large", // Small, medium, large
  rows: 5,
  cols: 5,
};

let board = {
  name: "my board",
};

let widget = {
  id: "abcd",
  type: "button",
};

function calculateGridCount(totalSize, gridSize, gridItemMargin) {
  const gridCount = (totalSize - gridItemMargin) / (gridItemMargin + gridSize);
  return Math.floor(gridCount);
}

function BoardContainer() {
  const containerRef = useRef(null);

  /** Calculate the board width and height based on the rows and cols */
  const boardWidth = COLS * (GRID_GUTTER + GRID_SIZE) + GRID_GUTTER;
  const boardHeight = ROWS * (GRID_GUTTER + GRID_SIZE) + GRID_GUTTER;

  /** Calculate the size and position for the background (indicators) of the board */
  const bgSize = GRID_SIZE + GRID_GUTTER;
  const bgPosition = GRID_GUTTER / 2;

  let layout = [];

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      layout.push({
        id: `${r}${c}`,
        type: "base",
        layout: { x: c, y: r, w: 1, h: 1 },
      });
    }
  }

  useEffect(() => {
    /** Calculate the space available for the board */
    const { width: totalWidth, height: totalHeight } =
      containerRef.current.getBoundingClientRect();
    const availWidth = totalWidth - GRID_GUTTER * 2;
    const availHeight = totalHeight - GRID_GUTTER * 2;

    /** Calculate the rows and columns that will fit in the space */
    const rows = calculateGridCount(availHeight, GRID_SIZE, GRID_GUTTER);
    const cols = calculateGridCount(availWidth, GRID_SIZE, GRID_GUTTER);

    console.log(`Recommended: ${rows} rows, ${cols} cols`);
  }, [GRID_SIZE, COLS, ROWS]);

  return (
    <div className={styles.container} ref={containerRef}>
      <ReactGridLayout
        className={styles.board}
        style={{
          backgroundImage: `${EDIT ? "" : "none"}`,
          backgroundSize: `${bgSize}px ${bgSize}px`,
          backgroundPosition: `top ${bgPosition}px left ${bgPosition}px`,
          width: boardWidth,
          height: boardHeight,
        }}
        cols={COLS}
        maxRows={ROWS}
        rowHeight={GRID_SIZE}
        width={boardWidth}
        compactType={null}
        autoSize={false}
        isDraggable={EDIT}
        isResizable={EDIT}
      >
        {layout.map((l) => createWidget(l))}
      </ReactGridLayout>
    </div>
  );
}

export default BoardContainer;
