import {
  isNull,
  flattenDeep,
  isObject,
} from 'lodash';
import getAst from '../ast';

const getSign = (status) => {
  switch (status) {
    case 'added':
      return ['+ ', null];
    case 'removed':
      return ['- ', null];
    case 'unchanged':
      return ['  ', null];
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

      const openingBracket = '{';
      const closingBracket = '}';

      const [signBefore, signAfter] = sign;

      if (!isNull(children)) {
        const value = iter(children, count + 1);
        return [
          ...acc,
          `${indent}  ${signBefore}${name}: ${openingBracket}`,
          value,
          `${indent}    ${closingBracket}`,
        ];
      }

      const [valBefore, valAfter] = values;

      if (!sign.includes(null)) {
        if (isObject(valBefore)) {
          const astFromValue = getAst(valBefore, valBefore);
          const value = iter(astFromValue, count + 1);
          return [
            ...acc,
            `${indent}  ${signBefore}${name}: ${openingBracket}`,
            value,
            `${indent}    ${closingBracket}`,
            `${indent}  ${signAfter}${name}: ${valAfter}`,
          ];
        }
        if (isObject(valAfter)) {
          const astFromValue = getAst(valAfter, valAfter);
          const value = iter(astFromValue, count + 1);
          return [
            ...acc,
            `${indent}  ${signBefore}${name}: ${valBefore}`,
            `${indent}  ${signAfter}${name}: ${openingBracket}`,
            value,
            `${indent}    ${closingBracket}`,
          ];
        }

        return [
          ...acc,
          `${indent}  ${signBefore}${name}: ${valBefore}`,
          `${indent}  ${signAfter}${name}: ${valAfter}`,
        ];
      }

      const [filledValue] = values.filter((value) => !isNull(value));

      if (isObject(filledValue)) {
        const astFromValue = getAst(filledValue, filledValue);
        const value = iter(astFromValue, count + 1);
        return [
          ...acc,
          `${indent}  ${signBefore}${name}: ${openingBracket}`,
          value,
          `${indent}    ${closingBracket}`,
        ];
      }

      return [
        ...acc,
        `${indent}  ${signBefore}${name}: ${filledValue}`,
      ];
    }, []);

    return diffElementsArray;
  };

  const flatElementsArr = flattenDeep(iter(ast, 0));
  const result = `{\n${flatElementsArr.join('\n')}\n}`;

  return result;
};

export default render;
