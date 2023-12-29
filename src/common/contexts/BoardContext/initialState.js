import PLACEHOLDER_IMAGE_URL from "../../static/placeholder.png";
import PLACEHOLDER_IMAGE_WHITE_URL from "../../static/placeholder-white.png";
import PLACEHOLDER_IMAGE_BLACK_URL from "../../static/placeholder-black.png";

export const initialState = {
  nextWidgetId: 19,
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
    17: {
      type: "toggle",
      layout: { x: 4, y: 5, w: 1, h: 1 },
      state: {
        label: "Mute",
        labelToggled: "Muted",
        fontSize: "fit",
      },
    },
    18: {
      type: "toggle",
      layout: { x: 5, y: 5, w: 1, h: 1 },
      state: {
        label: "Deafen",
        labelToggled: "Deafened",
        toggleOffColor: "#ff0000",
        toggleOnColor: "#26a4ed",
        fontSize: "fit",
      },
    },
  },
};
