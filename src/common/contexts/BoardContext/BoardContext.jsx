import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { initialState } from "./initialState";

const BoardContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setEditMode":
      return { ...state, editMode: action.bool };
    case "addWidget":
      state.descriptions[state.nextWidgetId] = action.description;
      return {
        ...state,
        descriptions: state.descriptions,
        nextWidgetId: state.nextWidgetId + 1,
      };
    case "deleteWidget":
      delete state.descriptions[Number(action.id)];
      return {
        ...state,
        descriptions: state.descriptions,
      };
    case "updateLayout":
      for (let layout of action.layouts) {
        const { i, ...theRest } = layout;
        state.descriptions[Number(i)].layout = theRest;
      }
      return state;
    default:
      throw new Error("Unknown action for BoardContext dispatcher");
  }
}

function BoardProvider({ children }) {
  const [{ editMode, descriptions }, dispatch] = useReducer(
    reducer,
    initialState
  );

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

  return (
    <BoardContext.Provider
      value={{
        editMode,
        descriptions,
        setEditMode,
        addWidget,
        deleteWidget,
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
