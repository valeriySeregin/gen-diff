import {
  isNull,
  flattenDeep,
  isObject,
} from 'lodash';
import getAst from '../ast';

const getFilledValue = (arr) => {
  const [firstValue, secondValue] = arr;

  if (isNull(firstValue)) {
    return secondValue;
  }
  if (isNull(secondValue)) {
    return firstValue;
  }

  return arr;
};

const getSign = (status) => {
  switch (status) {
    case 'added':
      return ['+ '];
    case 'removed':
      return ['- '];
    case 'unchanged':
      return ['  '];
    default:
      break;
  }

  return ['- ', '+ '];
};

const render = (ast) => {
  const iter = (tree, count) => {
    const diffElementsArray = tree.reduce((acc, item) => {
      const {
        name,
        status,
        values,
        children,
      } = item;

      const indent = `${'    '.repeat(count)}`;
      const sign = getSign(status);

      if (!isNull(children)) {
        return [...acc, `${indent}  ${sign}${name}: {`, iter(children, count + 1), `${indent}    }`];
      }

      if (sign.length === 2) {
        const [signBefore, signAfter] = sign;
        const [before, after] = values;

        if (isObject(before)) {
          const astFromValue = getAst(before, before);
          return [...acc, `${indent}  ${signBefore}${name}: {`, iter(astFromValue, count + 1), `${indent}    }`, `${indent}  ${signAfter}${name}: ${after}`];
        }
        if (isObject(after)) {
          const astFromValue = getAst(after, after);
          return [...acc, `${indent}  ${signBefore}${name}: ${before}`, `${indent}  ${signAfter}${name}: {`, iter(astFromValue, count + 1), `${indent}    }`];
        }

        return [...acc, `${indent}  ${signBefore}${name}: ${before}`, `${indent}  ${signAfter}${name}: ${after}`];
      }

      const [signStr] = sign;
      const filledValue = getFilledValue(values);

      if (isObject(filledValue)) {
        const astFromValue = getAst(filledValue, filledValue);
        return [...acc, `${indent}  ${signStr}${name}: {`, iter(astFromValue, count + 1), `${indent}    }`];
      }

      return [...acc, `${indent}  ${signStr}${name}: ${filledValue}`];
    }, []);

    return diffElementsArray;
  };

  const flatDiffElements = flattenDeep(iter(ast, 0));
  const result = `{\n${flatDiffElements.join('\n')}\n}`;

  return result;
};

export default render;
