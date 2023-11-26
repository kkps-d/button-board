/**
 * The base desciption for every widget
 * @typedef {Object} Base
 * @property {string} id - The ID used to identify the widget
 * @property {string} type - The type of the widget
 * @property {string} layout - The layout of the object on the board
 */

/**
 * The desciption for Label widgets
 * @typedef {Object} Label
 * @property {string} id - The ID used to identify the widget
 * @property {string} type - The type of the widget
 * @property {string} layout - The layout of the object on the board
 * @property {LabelState} state
 */

/**
 * The 'state' object for Label widgets
 * @typedef {Object} LabelState
 * @property {string} label - The text displayed on the label
 * @property {string | "fit"} fontSize - The font size, format as CSS font-size. Use "fit" for autofitting to the label
 * @property {"left" | "right" | "center"} align - The horizontal text alignment
 * @property {boolean} showBorders - Whether to show borders or not
 */

export const Descriptions = {};
