import getAst from './ast';
import parse from './parsers';
import tree from './formatters/treeRender';
import plain from './formatters/plainRender';

const getDiffString = (firstConfig, secondConfig, format) => {
  const contentBefore = parse(firstConfig);
  const contentAfter = parse(secondConfig);

  const ast = getAst(contentBefore, contentAfter);

  const renders = {
    tree,
    plain,
  };

  const render = renders[format];
  const diff = render(ast);

  return diff;
};

export default getDiffString;
