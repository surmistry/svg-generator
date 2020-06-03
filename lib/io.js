const fs = require('fs');
const path = require('path');


const writeFile = (fileName, data) => {
  fs.writeFileSync(path.resolve(fileName), data);
  console.log('Successfully wrote to file: ', fileName);
}

module.exports = { writeFile }