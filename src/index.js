import getAst from './ast';
import parse from './parsers';
import tree from './formatters/tree';
import plain from './formatters/plain';
import json from './formatters/json';

const generateDiff = (firstConfig, secondConfig, format) => {
  const contentBefore = parse(firstConfig);
  const contentAfter = parse(secondConfig);

  const ast = getAst(contentBefore, contentAfter);

  const renders = {
    tree,
    plain,
    json,
  };

  const render = renders[format];
  const diff = render(ast);

  return diff;
};

export default generateDiff;
