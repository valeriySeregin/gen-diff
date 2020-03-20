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

const renderPlainDiff = (tree, path) => tree
  .map((node) => {
    const nestedPath = `${path}.${node.key}`;
    const pathStr = _.trim(nestedPath, '.');
    switch (node.state) {
      case 'nested':
        return renderPlainDiff(node.children, nestedPath);
      case 'unchanged':
        return '';
      case 'changed': {
        const oldVal = isComplex(node.oldValue);
        const newVal = isComplex(node.newValue);
        return `Property '${pathStr}' was changed from ${oldVal} to ${newVal}`;
      }
      case 'added':
        return `Property '${pathStr}' was added with value: ${isComplex(node.value)}`;
      case 'deleted':
        return `Property '${pathStr}' was deleted`;
      default:
        throw new Error(`Error! '${node.state}' is invalid node state!`);
    }
  });

const render = (ast) => _.flattenDeep(renderPlainDiff(ast, ''))
  .filter((str) => str !== '')
  .join('\n');

export default render;
