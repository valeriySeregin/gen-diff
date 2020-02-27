import {
  isNull,
  flattenDeep,
  isObject,
} from 'lodash';
import getAst from '../ast';

const getSign = (status) => {
  switch (status) {
    case 'added':
      return ['+ '];
    case 'removed':
      return ['- '];
    case 'unchanged':
      return ['  '];
    case 'changed':
      return ['- ', '+ '];
    default:
      throw new Error(`Unknown status ${status}!`);
  }
};


const generateStringElements = (tree, deep) => {
  const diffElementsArray = tree.reduce((acc, subtree) => {
    const {
      name,
      status,
      values,
      children,
    } = subtree;

    const indent = `${'    '.repeat(deep)}`;
    const signs = getSign(status);

    if (!isNull(children)) {
      const formattedAst = generateStringElements(children, deep + 1);
      const partsArr = [
        `${indent}  ${signs}${name}: {`,
        formattedAst,
        `${indent}    }`,
      ];

      return [...acc, ...partsArr];
    }

    const filledValues = values.filter((value) => !isNull(value));

    const stringParts = filledValues.map((element, i) => {
      const marker = signs[i];

      if (isObject(element)) {
        const astFromElement = getAst(element, element);
        const formattedAst = generateStringElements(astFromElement, deep + 1);
        const partsArr = [
          `${indent}  ${marker}${name}: {`,
          formattedAst,
          `${indent}    }`,
        ];

        return partsArr;
      }

      const partsArr = [
        `${indent}  ${marker}${name}: ${element}`,
      ];

      return partsArr;
    });

    return [...acc, ...stringParts];
  }, []);

  return diffElementsArray;
};


const render = (ast) => {
  const initialDeep = 0;
  const stringElements = generateStringElements(ast, initialDeep);
  const flatElementsArr = flattenDeep(stringElements);
  const result = `{\n${flatElementsArr.join('\n')}\n}`;

  return result;
};

export default render;
