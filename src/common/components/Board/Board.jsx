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
// Don't change this, this will break grid squareness
const GRID_GUTTER = 10;

function calculateGridCount(totalSize, gridSize, gridItemMargin) {
  const gridCount = (totalSize - gridItemMargin) / (gridItemMargin + gridSize);
  return Math.floor(gridCount);
}

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

  useEffect(() => {
    /** Calculate the space available for the board */
    const { width: totalWidth, height: totalHeight } =
      containerRef.current.getBoundingClientRect();
    const availWidth = totalWidth - GRID_GUTTER * 2;
    const availHeight = totalHeight - GRID_GUTTER * 2;

    /** Calculate the rows and columns that will fit in the space */
    const recommendedRows = calculateGridCount(
      availHeight,
      gridSizePx,
      GRID_GUTTER
    );
    const recommendedCols = calculateGridCount(
      availWidth,
      gridSizePx,
      GRID_GUTTER
    );

    console.log(
      `Recommended: ${recommendedRows} rows, ${recommendedCols} cols`
    );
  }, [gridSizePx, cols, rows]);

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
          return createWidget({ ...desc, id });
        })}
      </ReactGridLayout>
    </div>
  );
}

export default Board;
