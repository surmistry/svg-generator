const fs = require('fs');
const utils = require('../utils');

const DEFAULT_DIMENSIONS = { width: 10, height: 10 };
getTemplateHead = (size = 10, dimensions = DEFAULT_DIMENSIONS) => {
  const { width, height } = dimensions
  const overlap = size * 0.01;
  const x0 = size,
    y0 = size / 2 + overlap,
    x1 = (3 / 4) * size + overlap,
    y1 = size + overlap,
    x2 = (1 / 4) * size - overlap,
    y2 = size + overlap,
    x3 = 0 - overlap,
    y3 = size / 2 + overlap,
    x4 = (1 / 4) * size,
    // y4 = (size / 2) - size / (Math.sqrt(3) * 2),
    y4 = 0,
    x5 = size * 3 / 4,
    // y5 = (size / 2) - size / (Math.sqrt(3) * 2);
    y5 = 0
  // console.log({ y0, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5 });
  // const head = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"  xmlns:xlink="http://www.w3.org/1999/xlink">
  // <defs><symbol id="t"><polygon points="2, 1 1.5, 2 0.5, 2 0, 1 0.5, 0.134 1.5, 0.134"/></symbol></defs>`
  const head = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs><symbol id="t"><polygon points="${x0}, ${y0} ${x1}, ${y1} ${x2}, ${y2} ${x3}, ${y3} ${x4}, ${y4} ${x5}, ${y5}"/></symbol></defs>`

  /* Points layout as such:             right, BOTRIGHT, BOTLEFT, LEFT, TOPLEFT, TOPRIGHT*/
  return head;
}


const DEFAULT_COLOUR = { r: 0, g: 0, b: 0 }
const createHexagon = ({ x, y }, color, noise = 15) => {
  return `  <use href="#t" x="${x}" y="${y}" style="fill: ${color}"/>`;
};

const DEFAULT_START_COLOUR = { r: 250, g: 100, b: 0 };
// const DEFAULT_END_COLOUR = { r: 54, g: 214, b: 142 };
const DEFAULT_END_COLOUR = { r: 51, g: 47, b: 38 };


const makeTemplate = (shapeSize = 3, viewBox = [10, 10], colors = { start: DEFAULT_START_COLOUR, end: DEFAULT_END_COLOUR }) => {
  const [width, height] = viewBox;

  let templateString = getTemplateHead(shapeSize, { width, height });
  let heightIncrementor = 0;
  const verticalOffset = shapeSize / 2;
  const horizontalOffset = shapeSize * 3 / 2;
  const colorMatrix = utils.createColorMatrix(colors.start, colors.end, shapeSize, viewBox)
  const matrixWidth = colorMatrix[0].length, matrixHeight = colorMatrix.length;
  console.log(colorMatrix)
  for (let y = 0; y < height; y += verticalOffset) {
    let widthIncrementor = 0;
    for (let x = (heightIncrementor % 2) ? - (3 / 4 * shapeSize) : 0; x < width; x += horizontalOffset) {
      const matrixYPos = heightIncrementor >= matrixHeight ? matrixHeight - 1 : heightIncrementor
      const matrixXPos = widthIncrementor >= matrixWidth ? matrixWidth - 1 : widthIncrementor
      templateString += createHexagon({ x, y }, colorMatrix[matrixYPos][matrixXPos]);
      widthIncrementor++;
    }
    heightIncrementor++;
  }
  const tail = `</svg>`;
  return (`${templateString}${tail}`);
}

const hextString = makeTemplate(15, [120, 115])
fs.writeFileSync('./output.svg', hextString)