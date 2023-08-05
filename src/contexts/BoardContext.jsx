import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

const initialState = {
  gridSize: 100,
  boardMargin: 0,
  gridItemMargin: 10, // Dont change this
  rows: null,
  cols: null,
  boardWidth: null,
  boardHeight: null,
};

function BoardProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <BoardContext.Provider
      value={{
        board: state,
        setBoard: setState,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined)
    throw new Error("useBoard is called outside of BoardProvider");

  return context;
}

export { BoardProvider, useBoard };
