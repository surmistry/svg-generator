#!/usr/bin/env node

const { hexagon } = require('./lib/templates');
const { writeFile } = require('./lib/utils');
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'start', type: String },
  { name: 'end', type: String, },
  { name: 'noise', alias: 'n', type: Number },
  { name: 'width', alias: 'w', type: Number },
  { name: 'height', alias: 'h', type: Number },
  { name: 'size', alias: 's', type: Number },
  { name: 'output', alias: 'o', type: string }
]

const options = commandLineArgs(optionDefinitions)
const { start, end, noise, width, height } = options;
const hexString = hexagon({ colors: { start, end }, shapeSize: 15, width, height, noise });
writeFile(options.output || './output.svg', hexString);

