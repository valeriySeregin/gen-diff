import fs from 'fs';
import path from 'path';
import buildAst from './ast';
import parse from './parsers';
import render from './formatters';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');

  return data;
};

export default (firstConfig, secondConfig, format = 'tree') => {
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);

  const contentBefore = parse(data1, firstConfig);
  const contentAfter = parse(data2, secondConfig);

  const ast = buildAst(contentBefore, contentAfter);

  const getRenderedTree = render(format);
  const diff = getRenderedTree(ast);

  return diff;
};
