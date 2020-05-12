const { hexagon } = require('./lib/templates');
const { writeFile } = require('./lib/utils');

const hexString = hexagon({ shapeSize: 15, viewBox: [200, 115], noise: 50 });
writeFile('./output.svg', hexString);
