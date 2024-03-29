import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { initialState } from "./initialState";

const BoardContext = createContext();

function reducer(state, action) {
  // Deep copy all the boards
  let boards = JSON.parse(JSON.stringify(state.boards));
  let currentBoard = boards[state.selectedBoardIndex];

  switch (action.type) {
    case "selectBoard":
      return { ...state, selectedBoardIndex: action.index };

    case "setEditMode":
      return { ...state, editMode: action.bool };

    case "addWidget":
      currentBoard.descriptions[currentBoard.nextWidgetId] = action.description;
      currentBoard.nextWidgetId++;

      return { ...state, boards };

    case "deleteWidget":
      delete currentBoard.descriptions[Number(action.id)];

      return { ...state, boards };

    case "updateLayout":
      for (let layout of action.layouts) {
        const { i, ...theRest } = layout;
        currentBoard.descriptions[Number(i)].layout = theRest;
      }

      return { ...state, boards };

    case "setDimensions":
      currentBoard.rows = action.rows;
      currentBoard.cols = action.cols;

      return { ...state, boards };

    case "setGridSize":
      currentBoard.gridSize = action.gridSize;

      return { ...state, boards };

    default:
      throw new Error("Unknown action for BoardContext dispatcher");
  }
}

function BoardProvider({ children }) {
  const [{ editMode, descriptions, boards, selectedBoardIndex }, dispatch] =
    useReducer(reducer, initialState);

  function setEditMode(bool) {
    dispatch({ type: "setEditMode", bool });
  }

  function addWidget(description) {
    dispatch({ type: "addWidget", description });
  }

  function deleteWidget(id) {
    dispatch({ type: "deleteWidget", id });
  }

  function updateLayout(layouts) {
    dispatch({ type: "updateLayout", layouts });
  }

  function selectBoard(index) {
    dispatch({ type: "selectBoard", index });
  }

  function setDimensions(rows, cols) {
    dispatch({ type: "setDimensions", rows, cols });
  }

  /**
   * @param {"small" | "medium" | "large"} size
   */
  function setGridSize(gridSize) {
    dispatch({ type: "setGridSize", gridSize });
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        descriptions,
        editMode,
        selectedBoardIndex,
        addWidget,
        deleteWidget,
        selectBoard,
        setEditMode,
        setDimensions,
        setGridSize,
        updateLayout,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard was used outside of BoardProvider");
  }
  return context;
}

export { BoardProvider, useBoard };
