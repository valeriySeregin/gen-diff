import program from 'commander';

export default () => {
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig>, <secondConfig>')
    .option('-f, --format [type]', 'output format')
    .action((type) => {});

  program.parse(process.argv);
};
