import {
  isNull,
  flattenDeep,
  isObject,
} from 'lodash';
import getAst from '../utils';

const getSign = (status) => {
  switch (status) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    case 'unchanged':
      return '  ';
    default:
      break;
  }

  return '';
};

const render = (ast) => {
  const iter = (tree, count) => {
    const diffElementsArray = tree.reduce((acc, item) => {
      const {
        name,
        status,
        value,
        children,
      } = item;

      const indent = `${'    '.repeat(count)}`;
      const sign = getSign(status);

      if (!isNull(children)) {
        return [...acc, `${indent}  ${sign}${name}: {`, iter(children, count + 1), `${indent}    }`];
      }

      if (isObject(value)) {
        const astFromValue = getAst(value, value);
        return [...acc, `${indent}  ${sign}${name}: {`, iter(astFromValue, count + 1), `${indent}    }`];
      }

      return [...acc, `${indent}  ${sign}${name}: ${value}`];
    }, []);

    return diffElementsArray;
  };

  const flatDiffElements = flattenDeep(iter(ast, 0));
  const result = `{\n${flatDiffElements.join('\n')}\n}`;

  return result;
};

export default render;
