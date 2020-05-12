const utils = require('../utils');

const DEFAULT_DIMENSIONS = { width: 10, height: 10 };
getTemplateHead = (size = 10, dimensions = DEFAULT_DIMENSIONS) => {
  const shapeHeight = Math.sqrt(3) / 2;
  const { width, height } = dimensions;
  const overlap = size * 0.01;
  const x0 = size,
    y0 = overlap + size * shapeHeight / 2,
    x1 = overlap + (3 / 4) * size,
    y1 = overlap + size * shapeHeight,
    x2 = (1 / 4) * size - overlap,
    y2 = overlap + size * shapeHeight,
    x3 = 0 - overlap,
    y3 = overlap + size * shapeHeight / 2,
    x4 = (1 / 4) * size,
    y4 = 0,
    x5 = size * 3 / 4,
    y5 = 0;
  const head = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs><symbol id="h"><polygon points="${x0}, ${y0} ${x1}, ${y1} ${x2}, ${y2} ${x3}, ${y3} ${x4}, ${y4} ${x5}, ${y5}"/></symbol>
  <symbol id="hH"><polygon points="${x0}, 0 ${x1}, ${y0} ${x2}, ${y2 / 2} ${x3}, ${0}"/></symbol></defs>`

  /* Points layout as such:             right, BOTRIGHT, BOTLEFT, LEFT, TOPLEFT, TOPRIGHT*/
  return head;
};

const createHalfHexagon = ({ x, y }, color) => {
  return `  <use href="#hH" x="${x}" y="${y}" style="fill: ${color}"/>`;
};

const createHexagon = ({ x, y }, color) => {
  return `  <use href="#h" x="${x}" y="${y}" style="fill: ${color}"/>`;
};

const DEFAULT_START_COLOUR = { r: 250, g: 100, b: 0 };
const DEFAULT_END_COLOUR = { r: 53, g: 3, b: 252 };
const DEFAULT_NOISE = 15;

const makeTemplate = ({
  colors = { start: DEFAULT_START_COLOUR, end: DEFAULT_END_COLOUR },
  noise = DEFAULT_NOISE,
  shapeSize = 3,
  viewBox = [10, 10],

}) => {
  const [width, height] = viewBox;
  let templateString = getTemplateHead(shapeSize, { width, height });
  let heightIncrementor = 0;
  const verticalOffset = shapeSize * Math.sqrt(3) / 4;
  const horizontalOffset = shapeSize * 3 / 2;
  const colorMatrix = utils.createColorMatrix(colors.start, colors.end, shapeSize, noise, viewBox);
  const matrixWidth = colorMatrix[0].length, matrixHeight = colorMatrix.length;
  for (let y = 0; y < height; y += verticalOffset) {
    let widthIncrementor = 0;
    if (y === 0) {

      for (let x = 0; x < width; x += horizontalOffset) {
        const matrixYPos = heightIncrementor >= matrixHeight ? matrixHeight - 1 : heightIncrementor
        const matrixXPos = widthIncrementor >= matrixWidth ? matrixWidth - 1 : widthIncrementor
        templateString += createHalfHexagon({ x, y }, colorMatrix[matrixYPos][matrixXPos]);
        widthIncrementor++;
      }
      heightIncrementor++;
      widthIncrementor = 0;
    }
    for (let x = (heightIncrementor % 2) ? (- 3 / 4 * shapeSize) : 0; x < width; x += horizontalOffset) {
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

module.exports = makeTemplate;