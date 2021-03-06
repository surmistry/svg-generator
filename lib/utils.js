
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

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];
const DEFAULT_BASES = [...Array(10)]
  .map((_, i) => `${i}`)
  .concat(alphabet);

const convertDecimalToBase = (input, noise, base = 16) => {
  const firstDigit = Math.floor(input / base);
  const secondDigit = (noise > 0)
    ? Math.floor(addRgbNoise(input, noise) % base)
    : Math.floor(input % base);


  return `${
    DEFAULT_BASES[firstDigit]
    }${
    DEFAULT_BASES[secondDigit]
    }`;
};

const convertHexToRgb = (hexCode) => {
  let code = {};
  if (typeof hexCode === 'string') {
    const hexSanitized = hexCode.replace('#', '');
    code.r = parseInt(hexSanitized.substring(0, 2), 16);
    code.g = parseInt(hexSanitized.substring(2, 4), 16);
    code.b = parseInt(hexSanitized.substring(4, 6), 16);
  }
  else code = hexCode;
  return code;
}

const DEFAULT_COLOURS = ['r', 'g', 'b'];
const convertRgbToHex = (colors, noise, indexes = DEFAULT_COLOURS) => {
  let hexString = '#';
  for (let color of indexes) {
    hexString += convertDecimalToBase(colors[color], noise);
  }
  return hexString;
};

const DIRECTIONS = {
  VERTICAL: 'vertical',
  DIAGONAL: 'diagonal',
  HORIZONTAL: 'horizontal'
}

const checkContains = (array, target) => array.indexOf(target) >= 0;

const DEFAULT_NUMBERS = ['noise', 'width', 'height', 'size'];
const DEFAULT_STRINGS = ['start', 'end', 'output'];
const NUMBER_TYPE = 'number';
const STRING_TYPE = 'string';
const validateInputs = (
  inputs,
  numberCheck = DEFAULT_NUMBERS,
  stringCheck = DEFAULT_STRINGS
) => {
  for (let [key, input] of Object.entries(inputs)) {
    if (checkContains(numberCheck, key)) {
      if (typeof input !== NUMBER_TYPE)
        throw new Error(`${key} requires a number,\nthis is incorrect ${input}`)
    }
    else if (checkContains(stringCheck, key)) {
      if (typeof input !== STRING_TYPE)
        throw new Error(`${key} requires a string,\nthis is incorrect ${input}`)
    }
  }
  return;
}


const createDiagonalMatrix = ({ height, width }, startColor, endColor, noise) => {
  const steps = height * width;
  const colorSteps = calculateIncrementors(steps, startColor, endColor);
  let diagonalMatrix = [...Array(height)].map(i => []);
  let updatingColor = startColor;
  for (let y = 0; y < height; y++) {
    let xPos = 0;
    for (let yPos = y; yPos >= 0; yPos--) {
      diagonalMatrix[yPos][xPos] = convertRgbToHex(updatingColor, noise);
      updatingColor = incrementColors(updatingColor, colorSteps);
      xPos++;
      if (xPos >= width) break;

    }
    if (y === height - 1) {
      for (xPos = 1; xPos < width; xPos++) {
        let incrXPos = xPos;
        for (let yPos = height - 1; yPos >= 0 && incrXPos < width; yPos--) {
          diagonalMatrix[yPos][incrXPos] = convertRgbToHex(updatingColor, noise);
          updatingColor = incrementColors(updatingColor, colorSteps);
          incrXPos++;
        }
      }
    }
  }
  return diagonalMatrix;
};

const createColorMatrix = (startColor, endColor, size, noise, viewBox = [100, 100], direction = DIRECTIONS.HORIZONTAL) => {
  const shapeHeight = size / (2 * Math.sqrt(3));
  const shapeWidth = size;
  const width = Math.floor(viewBox[0] / shapeWidth);
  const height = Math.floor(viewBox[1] / shapeHeight);
  const matrix = createDiagonalMatrix({ height, width }, startColor, endColor, noise)
  return (matrix);
}

module.exports = { validateInputs, createColorMatrix, convertHexToRgb }