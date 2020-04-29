const addRgbNoise = (value, noise = 15) => {
  const noiseGenerated = (Math.random() * noise);
  const colorNoise = noiseGenerated + value;
  return (colorNoise < 255)
    ? (colorNoise < 0) ? 0 : colorNoise
    : 255;
}

module.exports = { addRgbNoise }