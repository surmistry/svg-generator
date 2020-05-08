const addRgbNoise = (value, noise = 15) => {
  const noiseGenerated = (Math.random() * noise);
  const colorNoise = noiseGenerated + value;
  return (colorNoise < 255)
    ? (colorNoise < 0) ? 0 : colorNoise
    : 255;
}

const calculateIncrementors = (steps, startColor, endColor) => {
  let colorSteps = {}
  for (let color in startColor) {
    colorSteps[color] = (endColor[color] - startColor[color]) / steps;
  }
  return colorSteps;
}

const incrementColors = (colors, incrementors) => {
  for (let color in colors) {
    colors[color] += incrementors[color];
  }
  return colors;
}

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'];
const DEFAULT_BASES = [...Array(10)]
  .map((_, i) => `${i}`)
  .concat(alphabet);

const convertDecimalToBase = (input, noise, base = 16) => {
  const firstDigit = Math.floor(input / base);
  const secondDigit = Math.floor(input % base);
  // const secondDigit = Math.floor(utils.addRgbNoise(input, noise) % base);
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

const DIRECTIONS = {
  VERTICAL: 'vertical',
  DIAGONAL: 'diagonal',
  HORIZONTAL: 'horizontal'
}

const createDiagonalMatrix = ({ height, width }, startColor, endColor) => {
  const steps = height * width;
  const colorSteps = calculateIncrementors(steps, startColor, endColor);
  let diagonalMatrix = [...Array(height)].map(i => []);
  let updatingColor = startColor;
  for (let y = 0; y < height; y++) {
    let xPos = 0;
    for (let yPos = y; yPos >= 0; yPos--) {
      diagonalMatrix[yPos][xPos] = convertRgbToHex(updatingColor, 0);
      updatingColor = incrementColors(updatingColor, colorSteps);
      xPos++;
      if (xPos >= width) break;

    }
    if (y === height - 1) {
      for (xPos = 1; xPos < width; xPos++) {
        let incrXPos = xPos;
        for (let yPos = height - 1; yPos >= 0 && incrXPos < width; yPos--) {
          diagonalMatrix[yPos][incrXPos] = convertRgbToHex(updatingColor, 0);
          updatingColor = incrementColors(updatingColor, colorSteps);
          incrXPos++;
        }
      }
    }
  }
  return diagonalMatrix;
};

const createColorMatrix = (startColor, endColor, size, viewBox = [100, 100], direction = DIRECTIONS.HORIZONTAL) => {
  const shapeHeight = size / (2 * Math.sqrt(3));
  const shapeWidth = size;
  const width = Math.floor(viewBox[0] / shapeWidth);
  const height = Math.floor(viewBox[1] / shapeHeight);
  const matrix = createDiagonalMatrix({ height, width }, startColor, endColor)
  return (matrix);
}
// const matrix = createColorMatrix({ r: 0, g: 0, b: 150 }, { r: 255, g: 255, b: 25 }, 20, [40, 40], DIRECTIONS.HORIZONTAL);

module.exports = { addRgbNoise, createColorMatrix }