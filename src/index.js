import path from 'path';
import fs from 'fs';
import buildAst from './ast';
import parse from './parsers';
import format from './formatters';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getContent = (config) => {
  const data = readFile(config);
  const dataType = path.extname(config).slice(1);

  return parse(data, dataType);
};

export default (firstConfig, secondConfig, formatName) => {
  const contentBefore = getContent(firstConfig);
  const contentAfter = getContent(secondConfig);
  const ast = buildAst(contentBefore, contentAfter);

  return format(formatName, ast);
};
