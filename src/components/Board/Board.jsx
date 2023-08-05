import ReactGridLayout from "react-grid-layout";
import styles from "./Board.module.css";
import { useBoard } from "../../contexts/BoardContext";
import { useEffect, useRef } from "react";
import BaseWidget from "../Widgets/BaseWidget";
import widgetFactory from "../Widgets/WidgetFactory";

function calculateGridCount(totalSize, gridSize, gridItemMargin) {
  const gridCount = (totalSize - gridItemMargin) / (gridItemMargin + gridSize);
  return Math.floor(gridCount);
}

function Board() {
  const { board, setBoard } = useBoard();
  const {
    gridSize,
    boardMargin,
    gridItemMargin,
    rows,
    cols,
    boardWidth,
    boardHeight,
  } = board;

  const mainRef = useRef(null);
  const layoutRef = useRef(null);

  useEffect(() => {
    /** Calculate the space available for the board */
    const { width: totalWidth, height: totalHeight } =
      mainRef.current.getBoundingClientRect();
    const width = totalWidth - boardMargin * 2;
    const height = totalHeight - boardMargin * 2;

    /** Calculate the rows and columns that will in the space */
    const rows = calculateGridCount(height, gridSize, gridItemMargin);
    const cols = calculateGridCount(width, gridSize, gridItemMargin);

    /** Calculate the board width and height based on the rows and cols */
    const boardWidth = cols * (gridItemMargin + gridSize) + gridItemMargin;
    const boardHeight = rows * (gridItemMargin + gridSize) + gridItemMargin;

    /** Set the styles for the background grid of the board */
    if (layoutRef.current)
      layoutRef.current.style.backgroundSize = `${gridSize + 10}px ${
        gridSize + 10
      }px`;

    setBoard((state) => {
      const newState = { ...state, rows, cols, boardWidth, boardHeight };
      console.log(newState);
      return newState;
    });
  }, [boardMargin, gridItemMargin, gridSize, setBoard, rows, cols]);

  const widgets = [
    {
      id: "a",
      type: "rotaryPot",
      serverData: {},
      resources: {},
      state: {},
      layout: { x: 0, y: 0, w: 2, h: 2 },
    },
    {
      id: "b",
      type: "linearPot",
      serverData: {},
      resources: {},
      state: {},
      layout: { i: "b", x: 0, y: 3, w: 2, h: 1 },
    },
    {
      id: "c",
      type: "rotaryEncoder",
      serverData: {},
      resources: {},
      state: {},
      layout: { i: "c", x: 3, y: 0, w: 2, h: 2 },
    },
    {
      id: "d",
      type: "linearEncoder",
      serverData: {},
      resources: {},
      state: {},
      layout: { i: "c", x: 3, y: 3, w: 2, h: 1 },
    },
    {
      id: "e",
      type: "button",
      serverData: {},
      resources: {},
      state: {},
      layout: { i: "e", x: 6, y: 0, w: 1, h: 1 },
    },
    {
      id: "f",
      type: "imageFrame",
      serverData: {},
      resources: {},
      state: {},
      layout: { i: "f", x: 8, y: 0, w: 2, h: 5 },
    },
  ];

  return (
    <div className={styles.main} ref={mainRef}>
      {rows ? (
        <ReactGridLayout
          className={styles.layout}
          innerRef={layoutRef}
          cols={cols}
          rowHeight={gridSize}
          width={boardWidth}
          maxRows={rows}
          compactType={null}
          autoSize={false}
          style={{
            width: boardWidth,
            height: boardHeight,
          }}
        >
          {widgets.map((widget) => widgetFactory(widget))}
        </ReactGridLayout>
      ) : null}
    </div>
  );
}

export default Board;
