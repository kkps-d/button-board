function calculateGridCount(totalSize, gridSize, gridItemMargin) {
  const gridCount = (totalSize - gridItemMargin) / (gridItemMargin + gridSize);
  return Math.floor(gridCount);
}

export default calculateGridCount;
