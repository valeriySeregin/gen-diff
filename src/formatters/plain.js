import _ from 'lodash';

const isComplex = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const generatePath = (parents, currentKey) => [...parents, currentKey].join('.');

const mappings = {
  nested: (node, parentKeys, iter) => iter(node.children, [...parentKeys, node.key]),
  unchanged: () => '',
  changed: (node, parentKeys) => {
    const oldVal = isComplex(node.oldValue);
    const newVal = isComplex(node.newValue);
    return `Property '${generatePath(parentKeys, node.key)}' was changed from ${oldVal} to ${newVal}`;
  },
  added: (node, parentKeys) => `Property '${generatePath(parentKeys, node.key)}' was added with value: ${isComplex(node.value)}`,
  deleted: (node, parentKeys) => `Property '${generatePath(parentKeys, node.key)}' was deleted`,
};

const iter = (ast, parentKeys) => ast.map((node) => mappings[node.state](node, parentKeys, iter));

const render = (ast) => _.flattenDeep(iter(ast, [])).filter((str) => str).join('\n');

export default render;
