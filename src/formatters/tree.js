import _ from 'lodash';

const getTabIndent = (times) => '    '.repeat(times);

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

const getStringElementsForChildren = (formattedAst, name, marker, depth) => [
  `${getTabIndent(depth)}  ${marker}${name}: {`,
  formattedAst,
  `${getTabIndent(depth + 1)}}`,
];

const getStringElementsForValues = (values, name, markers, depth) => values
  .filter((value) => !_.isNull(value))
  .map((element, i) => {
    const marker = markers[i];

    if (_.isObject(element)) {
      const elementAsString = Object.entries(element)
        .map(([key, value]) => `${key}: ${value}`)
        .join('');
      const elementsArr = [
        `${getTabIndent(depth)}  ${marker}${name}: {`,
        `${getTabIndent(depth + 2)}${elementAsString}`,
        `${getTabIndent(depth + 1)}}`,
      ];

      return elementsArr;
    }

    const elementsArr = [
      `${getTabIndent(depth)}  ${marker}${name}: ${element}`,
    ];

    return elementsArr;
  });

const generateStringElements = (tree, depth) => tree.map((subtree) => {
  const {
    name,
    state,
    values,
    children,
  } = subtree;

  const markers = getMarkers(state);

  if (!_.isNull(children)) {
    const formattedAst = generateStringElements(children, depth + 1);
    const [marker] = markers;

    return getStringElementsForChildren(formattedAst, name, marker, depth);
  }

  return getStringElementsForValues(values, name, markers, depth);
});

const render = (ast) => {
  const initialDepth = 0;
  const stringElements = generateStringElements(ast, initialDepth);
  const flatElementsArr = _.flattenDeep(stringElements);
  const result = `{\n${flatElementsArr.join('\n')}\n}`;

  return result;
};

export default render;
