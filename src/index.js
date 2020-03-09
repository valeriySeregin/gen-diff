import path from 'path';
import buildAst from './ast';
import parse from './parsers';
import render from './formatters/formatters';
import readFile from './utils';

export default (firstConfig, secondConfig, format) => {
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);

  const extensionBefore = path.extname(firstConfig);
  const extensionAfter = path.extname(secondConfig);

  const contentBefore = parse(data1, extensionBefore);
  const contentAfter = parse(data2, extensionAfter);

  const ast = buildAst(contentBefore, contentAfter);

  const getRenderedTree = render(format);
  const diff = getRenderedTree(ast);

  return diff;
};
