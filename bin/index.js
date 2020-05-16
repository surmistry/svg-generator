#!/usr/bin/env node

const { hexagon } = require('../lib/templates');
const { writeFile } = require('../lib/utils');
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const optionDefinitions = [
  { name: 'start', type: String },
  { name: 'end', type: String, },
  { name: 'noise', alias: 'n', type: Number },
  { name: 'width', alias: 'w', type: Number },
  { name: 'height', alias: 'h', type: Number },
  { name: 'size', alias: 's', type: Number },
  { name: 'output', alias: 'o', type: String },
  { name: 'help', type: Boolean }
]

const inputParameters = [
  {
    header: 'SVG Generator',
    content: 'Generates an SVG image pattern.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'size',
        alias: 's',
        typeLabel: '{underline number}',
        description: 'Size of the repeating shape.'
      },
      {
        name: 'start',
        typeLabel: '{underline string}',
        description: 'Hexadecimal string representing the starting color.'
      },
      {
        name: 'end',
        typeLabel: '{underline string}',
        description: 'Hexadecimal string representing the starting color.'
      },
      {
        name: 'noise',
        alias: 'n',
        typeLabel: '{underline number}',
        description: 'Noise variantion added to colour gradient.'
      },
      {
        name: 'width',
        alias: 'w',
        typeLabel: '{underline number}',
        description: 'Width of viewbox, defaults to 100.'
      },
      {
        name: 'height',
        alias: 'hh',
        typeLabel: '{underline number}',
        description: 'Height of viewbox, defaults to 80.'
      },
      {
        name: 'output',
        alias: 'o',
        typeLabel: '{underline string}',
        description: '.'
      }
    ]
  }
]

const options = commandLineArgs(optionDefinitions)
if (options.help) {
  const usage = commandLineUsage(inputParameters)
  console.log(usage)
  return
}
const { start, end, noise, width, height } = options;
const hexString = hexagon({ colors: { start, end }, shapeSize: 15, width, height, noise });
writeFile(options.output || 'output.svg', hexString);

