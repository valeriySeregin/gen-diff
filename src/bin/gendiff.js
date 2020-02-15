#!/usr/bin/env node

import program from 'commander';
import getArgumentsForAction from '..';

program
  .version('0.4.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(getArgumentsForAction(firstConfig, secondConfig));
  });

program.parse(process.argv);
