const fs = require('fs');
const utils = require('../utils');

const DEFAULT_DIMENSIONS = { width: 10, height: 10 };
getTemplateHead = (size = 10, dimensions = DEFAULT_DIMENSIONS) => {
  const { width, height } = dimensions
  const head = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs><symbol id="t"><polygon points="3, 1 2.5, 1.866 1.5, 1.866 1, 1 1.5, 0.134 1.5, 0.134 2.5, 0.134"/></symbol></defs>`
  /* Points layout as such:             right, BOTRIGHT, BOTLEFT, LEFT, TOPLEFT, TOPRIGHT, TOPRIGHT*/
  return head;
}

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'];
const DEFAULT_BASES = [...Array(10)]
  .map((_, i) => `${i}`)
  .concat(alphabet);

const convertDecimalToBase = (input, noise, base = 16) => {
  const firstDigit = Math.floor(input / base);
  const secondDigit = Math.floor(utils.addRgbNoise(input, noise) % base);
  return `${
    DEFAULT_BASES[firstDigit]
    }${
    DEFAULT_BASES[secondDigit]
    }`;
}

const DEFAULT_COLOURS = ['r', 'g', 'b'];
const convertRgbToHex = (colors, noise = 15, indexes = DEFAULT_COLOURS) => {
  let hexString = '#';
  for (let color of indexes) {
    hexString += convertDecimalToBase(colors[color], noise);
  }
  return hexString;
}

const DEFAULT_COLOUR = { r: 0, g: 0, b: 0 }
const createHexagon = ({ x, y }, color = DEFAULT_COLOUR, noise = 15) => {
  return `  <use href="#t" x="${x}" y="${y}" style="fill: ${convertRgbToHex(color, noise)}"/>`;
};

const incrementColors = (colors, incrementors) => {
  for (let color in colors) {
    colors[color] += incrementors[color];
  }
  return colors;
}

const calculateIncrementors = (steps, startColor, endColor) => {
  let colorSteps = {}
  for (let color in startColor) {
    colorSteps[color] = (endColor[color] - startColor[color]) *
      (steps.veritcal * steps.horizontal);
  }
  return colorSteps;
}

const DEFAULT_START_COLOUR = { r: 250, g: 100, b: 0 };
const DEFAULT_END_COLOUR = { r: 255, g: 71, b: 151 };

const makeTemplate = (shapeSize = 3, viewBox = [10, 10], colors = { start: DEFAULT_START_COLOUR, end: DEFAULT_END_COLOUR }) => {
  const [width, height] = viewBox;

  let templateString = getTemplateHead(shapeSize, { width, height });
  let heightIncrementor = 0;
  const verticalOffset = 0.866;
  const horizontalOffset = 3;
  const verticalSteps = verticalOffset / height;
  const horizontalSteps = horizontalOffset / width;
  const steps = { veritcal: verticalSteps, horizontal: horizontalSteps };
  const colorIncrementors = calculateIncrementors(steps, DEFAULT_START_COLOUR, DEFAULT_END_COLOUR);
  let changingColor = colors.start;
  // const colorIncrement = (verticalOffset / height * horizontalOffset / width) * 246;
  for (let y = 0; y < height; y += verticalOffset) {
    for (let x = (heightIncrementor % 2) ? -1.5 : 0; x < width; x += horizontalOffset) {
      // let updatingNoise = Math.abs(1 - ((x / width * heightIncrementor) / (steps.vertical * steps.horizontal))) * 15;
      templateString += createHexagon({ x, y }, changingColor);
      changingColor = incrementColors(changingColor, colorIncrementors);
    }
    heightIncrementor++;
  }
  const tail = `</svg>`;
  return (`${templateString}${tail}`);
}

const hextString = makeTemplate(3, [70, 50])
fs.writeFileSync('./output.svg', hextString)