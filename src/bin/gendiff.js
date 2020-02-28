#!/usr/bin/env node

import program from 'commander';
import generateDiff from '..';

program
  .version('0.6.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const diffString = generateDiff(firstConfig, secondConfig, options.format);
    console.log(diffString);
  });

program.parse(process.argv);
