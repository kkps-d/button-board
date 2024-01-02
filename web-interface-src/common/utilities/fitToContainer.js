const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

export default function fitToContainer(containerElm, maxSize = 100) {
  let text = containerElm.innerText;
  if (text.length < 1) return;

  // Get the required styles of the container
  const {
    fontFamily,
    borderLeftWidth: lw,
    borderRightWidth: rw,
    borderBottomWidth: bw,
    borderTopWidth: tw,
    paddingLeft: pl,
    paddingRight: pr,
    paddingBottom: pb,
    paddingTop: pt,
  } = getComputedStyle(containerElm);

  // Set the font to the 2d context
  ctx.font = `10px ${fontFamily}`;

  // Split text for multiline
  const lines = text.split("\n");
  const lineCount = lines.length;

  // Find the max width between the lines
  let textWidth = Number.MIN_VALUE;
  let metrics;
  for (const line of lines) {
    metrics = ctx.measureText(line);
    textWidth = Math.max(metrics.width, textWidth);
  }

  // Get the height of the text
  const textHeight =
    (metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent) *
    lineCount;

  // Get the dimensions of the container
  const rect = containerElm.getBoundingClientRect();

  // Get the borders and padding widths of the container
  const verBorders = Number(tw.slice(0, -2)) + Number(bw.slice(0, -2));
  const horBorders = Number(lw.slice(0, -2)) + Number(rw.slice(0, -2));
  const verPadding = Number(pt.slice(0, -2)) + Number(pb.slice(0, -2));
  const horPadding = Number(pl.slice(0, -2)) + Number(pr.slice(0, -2));

  // Calculate the available dimensions of the container
  const containerWidth = rect.width - horBorders - verPadding;
  const containerHeight = rect.height - verBorders - horPadding;

  // Find the font size that will fit within the dimensions of the container
  const maxVerFontSize = (10 * containerHeight) / textHeight;
  const maxHorFontSize = (10 * containerWidth) / textWidth;
  const recommendedFontSize = Math.floor(
    Math.min(maxVerFontSize, maxHorFontSize, maxSize)
  );

  // Set the font style of the container
  containerElm.style.fontSize = `${recommendedFontSize}px`;
}
