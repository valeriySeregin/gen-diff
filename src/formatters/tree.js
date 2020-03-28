import _ from 'lodash';

const indent = (number) => '    '.repeat(number);

const stringifyObject = (obj) => Object.entries(obj).map(([key, value]) => `${key}: ${value}`);

const stringify = (value, depth) => (
  _.isObject(value) ? `{\n${indent(depth + 2)}${stringifyObject(value)}\n${indent(depth + 1)}}` : value
);

const mappings = {
  nested: ({ key, children }, depth, iter) => `${indent(depth)}    ${key}: {\n${iter(children, depth + 1).join('\n')}\n${indent(depth + 1)}}`,
  unchanged: ({ key, value }, depth) => `${indent(depth)}    ${key}: ${stringify(value, depth)}`,
  changed: ({ key, oldValue, newValue }, depth) => {
    const oldValueString = `${indent(depth)}  - ${key}: ${stringify(oldValue, depth)}`;
    const newValueString = `${indent(depth)}  + ${key}: ${stringify(newValue, depth)}`;
    return `${oldValueString}\n${newValueString}`;
  },
  added: ({ key, value }, depth) => `${indent(depth)}  + ${key}: ${stringify(value, depth)}`,
  deleted: ({ key, value }, depth) => `${indent(depth)}  - ${key}: ${stringify(value, depth)}`,
};

const iter = (ast, depth) => ast.map((node) => mappings[node.state](node, depth, iter));

const render = (ast) => {
  const initialDepth = 0;
  const string = iter(ast, initialDepth)
    .flat(Infinity)
    .join('\n');

  return `{\n${string}\n}`;
};

export default render;
