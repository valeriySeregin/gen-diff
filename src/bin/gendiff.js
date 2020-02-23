#!/usr/bin/env node

import program from 'commander';
import getDiffString from '..';

program
  .version('0.5.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const diffString = getDiffString(firstConfig, secondConfig, options.format);
    console.log(diffString);
  });

program.parse(process.argv);
