import {
  isNull,
} from 'lodash';

const getPartByType = (type, value) => {
  switch (type) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const mapper = (value) => {
  const type = typeof value;
  return getPartByType(type, value);
};

const getStringByStatus = (values) => {
  const filledValues = values.filter((value) => !isNull(value));
  const lastPart = filledValues.map(mapper);

  return lastPart;
};

const getStringTemplate = (status, values) => {
  switch (status) {
    case 'added':
      return `was added with value: ${getStringByStatus(values)}`;
    case 'removed':
      return 'was deleted';
    case 'changed': {
      const [before, after] = getStringByStatus(values);
      return `was changed from ${before} to ${after}`;
    }
    default:
      return null;
  }
};

const render = (ast) => {
  const iter = (tree, names) => {
    const content = tree.reduce((acc, subTree) => {
      const {
        name,
        status,
        values,
        children,
      } = subTree;

      if (!isNull(children)) {
        const newNames = [...names, name];
        return [...acc, iter(children, newNames)];
      }
      if (status === 'unchanged') {
        return acc;
      }

      const currentNames = [...names, name];
      const nextString = `Property '${currentNames.join('.')}' ${getStringTemplate(status, values)}`;

      return [...acc, nextString];
    }, []);

    return content.join('\n');
  };

  return iter(ast, []);
};

export default render;
