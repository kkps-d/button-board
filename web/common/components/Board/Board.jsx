import ReactGridLayout from "react-grid-layout";
import styles from "./Board.module.css";
import { useEffect, useRef } from "react";
import createWidget from "../Widgets/createWidget";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { useBoard } from "../../contexts/BoardContext/BoardContext";

import { GRID_SIZES, GRID_GUTTER } from "./board-constants";
import calculateBoardDimensions from "../../utilities/calculateBoardDimensions";
import calculateGridCount from "../../utilities/calculateGridCount";

function Board() {
  const { boards, selectedBoardIndex, editMode, updateLayout } = useBoard();
  const containerRef = useRef(null);

  const { descriptions, rows, cols, gridSize } = boards[selectedBoardIndex];
  const gridSizePx = GRID_SIZES[gridSize];

  function onLayoutUpdate(layouts) {
    updateLayout(layouts);
  }

  /** Calculate the board width and height based on the rows and cols */
  const boardWidth = cols * (GRID_GUTTER + gridSizePx) + GRID_GUTTER;
  const boardHeight = rows * (GRID_GUTTER + gridSizePx) + GRID_GUTTER;

  /** Calculate the size and position for the background (indicators) of the board */
  const bgSize = gridSizePx + GRID_GUTTER;
  const bgPosition = GRID_GUTTER / 2;

  // Shows the recommended rows and cols for the current available space
  // useEffect(() => {
  //   const { width, height } = containerRef.current.getBoundingClientRect();
  //   let results = calculateBoardDimensions(width, height, gridSize);
  //   console.log(`Recommended: ${results.rows} rows, ${results.cols} cols`);
  // }, [gridSizePx, cols, rows, gridSize]);

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
        cols={cols}
        maxRows={rows}
        rowHeight={gridSizePx}
        width={boardWidth}
        compactType={null}
        autoSize={false}
        isDraggable={editMode}
        isResizable={editMode}
        onResizeStop={onLayoutUpdate}
        onDragStop={onLayoutUpdate}
      >
        {Object.entries(descriptions).map((entry) => {
          const [id, desc] = entry;
          return createWidget({ ...desc, id }, gridSize);
        })}
      </ReactGridLayout>
    </div>
  );
}

export default Board;
