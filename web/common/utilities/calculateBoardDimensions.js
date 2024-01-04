// Don't change this, this will break grid squareness

import { GRID_GUTTER, GRID_SIZES } from "../components/Board/board-constants";
import calculateGridCount from "./calculateGridCount";

/**
 * Calculates the rows and cols that will fit in the specified dimensions
 * @param {string} widthPx The width of the container in pixels
 * @param {string} heightPx The height of the container in pixels
 * @param {"small" | "medium" | "large"} gridSize The grid size
 * @returns {{rows: number, cols: number}}
 */
function calculateBoardDimensions(widthPx, heightPx, gridSize) {
  const availWidth = widthPx - GRID_GUTTER * 2;
  const availHeight = heightPx - GRID_GUTTER * 2;

  const rows = calculateGridCount(
    availHeight,
    GRID_SIZES[gridSize],
    GRID_GUTTER
  );
  const cols = calculateGridCount(
    availWidth,
    GRID_SIZES[gridSize],
    GRID_GUTTER
  );

  return { rows, cols };
}

export default calculateBoardDimensions;
