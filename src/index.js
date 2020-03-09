import buildAst from './ast';
import parse from './parsers';
import render from './formatters/formatters';
import readFile from './utils';

export default (firstConfig, secondConfig, format) => {
  const data1 = readFile(firstConfig);
  const data2 = readFile(secondConfig);

  const contentBefore = parse(data1, firstConfig);
  const contentAfter = parse(data2, secondConfig);

  const ast = buildAst(contentBefore, contentAfter);

  const getRenderedTree = render(format);
  const diff = getRenderedTree(ast);

  return diff;
};
