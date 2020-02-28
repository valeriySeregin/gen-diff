import {
  isNull,
  flattenDeep,
  isObject,
} from 'lodash';
import buildAst from '../ast';

const getMarkers = (state) => {
  switch (state) {
    case 'added':
      return ['+ '];
    case 'deleted':
      return ['- '];
    case 'unchanged':
      return ['  '];
    case 'changed':
      return ['- ', '+ '];
    default:
      throw new Error(`Unknown state ${state}!`);
  }
};


const generateStringElements = (tree, deep) => {
  const diffElementsArray = tree.reduce((acc, subtree) => {
    const {
      name,
      state,
      values,
      children,
    } = subtree;

    const indent = `${'    '.repeat(deep)}`;
    const markers = getMarkers(state);

    if (!isNull(children)) {
      const formattedAst = generateStringElements(children, deep + 1);
      const [marker] = markers;
      const partsArr = [
        `${indent}  ${marker}${name}: {`,
        formattedAst,
        `${indent}    }`,
      ];

      return [...acc, ...partsArr];
    }

    const filledValues = values.filter((value) => !isNull(value));

    const stringElements = filledValues.map((element, i) => {
      const marker = markers[i];

      if (isObject(element)) {
        const astFromElement = buildAst(element, element);
        const formattedAst = generateStringElements(astFromElement, deep + 1);
        const elementsArr = [
          `${indent}  ${marker}${name}: {`,
          formattedAst,
          `${indent}    }`,
        ];

        return elementsArr;
      }

      const elementsArr = [
        `${indent}  ${marker}${name}: ${element}`,
      ];

      return elementsArr;
    });

    return [...acc, ...stringElements];
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
