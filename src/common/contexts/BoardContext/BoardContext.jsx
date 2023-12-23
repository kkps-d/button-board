import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const BoardContext = createContext();

const initialState = {
  nextWidgetId: 4,
  editMode: false,
  descriptions: {
    1: {
      type: "invalid",
      layout: { x: 0, y: 1, w: 1, h: 1 },
      state: {},
    },
    2: {
      type: "button",
      layout: { x: 1, y: 1, w: 1, h: 1 },
      state: {
        label: "Mute",
        fontSize: "fit",
      },
    },
    3: {
      type: "label",
      layout: { x: 0, y: 0, w: 2, h: 1 },
      state: {
        label: "My label",
        fontSize: "fit",
        align: "center",
        showBorders: false,
      },
    },
  },
};

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
    console.log(id);
    dispatch({ type: "deleteWidget", id });
  }

  return (
    <BoardContext.Provider
      value={{
        editMode,
        descriptions,
        setEditMode,
        addWidget,
        deleteWidget,
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
