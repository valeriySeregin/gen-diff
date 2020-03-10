import _ from 'lodash';

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

const generateStringElements = (tree, depth) => {
  const diffElementsArray = tree.map((subtree) => {
    const {
      name,
      state,
      values,
      children,
    } = subtree;

    const indent = (times) => '    '.repeat(times);
    const markers = getMarkers(state);

    if (!_.isNull(children)) {
      const formattedAst = generateStringElements(children, depth + 1);
      const [marker] = markers;
      const elementsArr = [
        `${indent(depth)}  ${marker}${name}: {`,
        formattedAst,
        `${indent(depth + 1)}}`,
      ];

      return elementsArr;
    }

    const filledValues = values.filter((value) => !_.isNull(value));

    const stringElements = filledValues.map((element, i) => {
      const marker = markers[i];

      if (_.isObject(element)) {
        const elementAsString = Object.entries(element)
          .map(([key, value]) => `${key}: ${value}`)
          .join('');
        const elementsArr = [
          `${indent(depth)}  ${marker}${name}: {`,
          `${indent(depth + 2)}${elementAsString}`,
          `${indent(depth + 1)}}`,
        ];

        return elementsArr;
      }

      const elementsArr = [
        `${indent(depth)}  ${marker}${name}: ${element}`,
      ];

      return elementsArr;
    });

    return stringElements;
  });

  return diffElementsArray;
};

const render = (ast) => {
  const initialDepth = 0;
  const stringElements = generateStringElements(ast, initialDepth);
  const flatElementsArr = _.flattenDeep(stringElements);
  const result = `{\n${flatElementsArr.join('\n')}\n}`;

  return result;
};

export default render;
