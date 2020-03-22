import _ from 'lodash';

const indent = (number) => '    '.repeat(number);

const generateNestedElements = (node, depth, marker, iter) => {
  const { key, children } = node;
  const elements = iter(children, depth + 1);

  return [
    `${indent(depth)}${marker}${key}: {`,
    elements,
    `${indent(depth + 1)}}`,
  ];
};

const generateStandardElements = (node, depth, marker) => {
  const { key, value } = node;

  if (_.isObject(value)) {
    const elements = Object.entries(value)
      .map(([entKey, entValue]) => `${entKey}: ${entValue}`);

    return [
      `${indent(depth)}${marker}${key}: {`,
      `${indent(depth + 2)}${elements}`,
      `${indent(depth + 1)}}`,
    ];
  }

  return [`${indent(depth)}${marker}${key}: ${value}`];
};

const generateChangedElements = (node, depth) => {
  const { key, oldValue, newValue } = node;

  return [
    ...generateStandardElements({ key, value: oldValue }, depth, '  - '),
    ...generateStandardElements({ key, value: newValue }, depth, '  + '),
  ];
};

const markers = {
  nested: '    ',
  unchanged: '    ',
  changed: '',
  added: '  + ',
  deleted: '  - ',
};

const mappings = {
  nested: generateNestedElements,
  unchanged: generateStandardElements,
  changed: generateChangedElements,
  added: generateStandardElements,
  deleted: generateStandardElements,
};

const iter = (ast, depth) => ast
  .map((node) => mappings[node.state](node, depth, markers[node.state], iter));

const render = (ast) => {
  const initialDepth = 0;
  const stringElements = iter(ast, initialDepth);
  const flatElements = _.flattenDeep(stringElements);

  return `{\n${flatElements.join('\n')}\n}`;
};

export default render;
