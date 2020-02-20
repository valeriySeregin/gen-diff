#!/usr/bin/env node

import program from 'commander';
import getDiffString from '..';

program
  .version('0.4.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diffString = getDiffString(firstConfig, secondConfig);
    console.log(diffString);
  });

program.parse(process.argv);
