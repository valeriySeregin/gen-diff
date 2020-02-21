import getAst from './utils';
import render from './formatters/treeRender';
import parse from './parsers';

const getDiffString = (firstConfig, secondConfig) => {
  const firstObject = parse(firstConfig);
  const secondObject = parse(secondConfig);
  const ast = getAst(firstObject, secondObject);
  const diffString = render(ast);

  return diffString;
};

export default getDiffString;
