import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

import PLACEHOLDER_IMAGE_URL from "../../static/placeholder.png";
import PLACEHOLDER_IMAGE_WHITE_URL from "../../static/placeholder-white.png";
import PLACEHOLDER_IMAGE_BLACK_URL from "../../static/placeholder-black.png";

const BoardContext = createContext();

const initialState = {
  nextWidgetId: 12,
  editMode: false,
  descriptions: {
    1: {
      type: "button",
      layout: { x: 0, y: 1, w: 1, h: 1 },
      state: {
        label: "Mute",
        fontSize: "fit",
      },
    },
    3: {
      type: "label",
      layout: { x: 0, y: 0, w: 1, h: 1 },
      state: {
        label: "My label",
        fontSize: "fit",
        align: "center",
        showBorders: false,
      },
    },
    4: {
      type: "v-scroll",
      layout: { x: 0, y: 2, w: 1, h: 3 },
      state: {
        label: "Vertical scroll with text",
      },
    },
    5: {
      type: "v-scroll",
      layout: { x: 1, y: 2, w: 1, h: 3 },
      state: {},
    },
    6: {
      type: "h-scroll",
      layout: { x: 1, y: 0, w: 3, h: 1 },
      state: {},
    },
    7: {
      type: "h-scroll",
      layout: { x: 1, y: 1, w: 3, h: 1 },
      state: {
        label: "Horizontal scroll with text",
      },
    },
    8: {
      type: "free-knob",
      layout: { x: 2, y: 2, w: 2, h: 2 },
      state: {
        label: "Free knob",
      },
    },
    9: {
      type: "free-knob",
      layout: { x: 0, y: 5, w: 1, h: 1 },
      state: {},
    },
    10: {
      type: "fixed-knob",
      layout: { x: 2, y: 4, w: 2, h: 2 },
      state: {
        label: "Fixed 1",
        min: 0,
        max: 100,
        degrees: 270,
      },
    },
    11: {
      type: "fixed-knob",
      layout: { x: 1, y: 5, w: 1, h: 1 },
      state: {
        min: 0,
        max: 100,
        degrees: 300,
      },
    },
    12: {
      type: "v-slider",
      layout: { x: 4, y: 0, w: 1, h: 3, minH: 2 },
      state: {
        label: "Vertical slider",
        min: 0,
        max: 100,
      },
    },
    13: {
      type: "v-slider",
      layout: { x: 5, y: 0, w: 1, h: 3, minH: 2 },
      state: {
        min: 0,
        max: 100,
      },
    },
    14: {
      type: "h-slider",
      layout: { x: 4, y: 3, w: 2, h: 1, minW: 2 },
      state: {
        min: 0,
        max: 100,
      },
    },
    15: {
      type: "h-slider",
      layout: { x: 4, y: 4, w: 2, h: 1, minW: 2 },
      state: {
        label: "Horizontal slider",
        min: 0,
        max: 100,
      },
    },
    16: {
      type: "image-frame",
      layout: { x: 6, y: 0, w: 3, h: 2 },
      state: {
        label: "Forsen",
        labelPosition: "bottom",
        src: PLACEHOLDER_IMAGE_URL,
        imageFit: "cover",
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
