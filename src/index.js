import path from 'path';
import buildAst from './ast';
import parse from './parsers';
import render from './formatters/formatters';
import readFile from './utils';

export default (firstConfig, secondConfig, format) => {
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);

  const dataTypeBefore = path.extname(firstConfig).slice(1);
  const dataTypeAfter = path.extname(secondConfig).slice(1);

  const contentBefore = parse(data1, dataTypeBefore);
  const contentAfter = parse(data2, dataTypeAfter);

  const ast = buildAst(contentBefore, contentAfter);

  const getRenderedTree = render(format);
  const diff = getRenderedTree(ast);

  return diff;
};
