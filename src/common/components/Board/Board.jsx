import ReactGridLayout from "react-grid-layout";
import styles from "./Board.module.css";
import { useEffect, useRef } from "react";
import createWidget from "../Widgets/createWidget";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { useBoard } from "../../contexts/BoardContext/BoardContext";

const GRID_SIZES = {
  small: 80,
  medium: 90,
  large: 100,
};
const GRID_GUTTER = 10;

// let EDIT = false;
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

function Board() {
  const { descriptions, editMode, updateLayout } = useBoard();
  const containerRef = useRef(null);

  function onLayoutUpdate(layouts) {
    updateLayout(layouts);
  }

  /** Calculate the board width and height based on the rows and cols */
  const boardWidth = COLS * (GRID_GUTTER + GRID_SIZE) + GRID_GUTTER;
  const boardHeight = ROWS * (GRID_GUTTER + GRID_SIZE) + GRID_GUTTER;

  /** Calculate the size and position for the background (indicators) of the board */
  const bgSize = GRID_SIZE + GRID_GUTTER;
  const bgPosition = GRID_GUTTER / 2;

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
          backgroundImage: `${editMode ? "" : "none"}`,
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
        isDraggable={editMode}
        isResizable={editMode}
        onResizeStop={onLayoutUpdate}
        onDragStop={onLayoutUpdate}
      >
        {/* {descriptions.map((l) => createWidget(l))} */}
        {/* {Object.entries(descriptions).reduce((acc, curr) => {
          const [id, desc] = curr;
          return [...acc, createWidget({ ...desc, id })];
        }, [])} */}
        {Object.entries(descriptions).map((entry) => {
          const [id, desc] = entry;
          return createWidget({ ...desc, id });
        })}
      </ReactGridLayout>
    </div>
  );
}

export default Board;
