#!/usr/bin/env node

import program from 'commander';
import generateDiff from '..';

program
  .version('0.7.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    console.log(generateDiff(firstConfig, secondConfig, options.format));
  });

program.parse(process.argv);
