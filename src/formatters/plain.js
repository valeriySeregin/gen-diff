import {
  isNull,
} from 'lodash';

const getStringPartByType = (type, value) => {
  switch (type) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const mapValueIntoElement = (value) => {
  const type = typeof value;
  return getStringPartByType(type, value);
};

const getStringElementsFromValues = (values) => {
  const filledValues = values.filter((value) => !isNull(value));
  const elements = filledValues.map(mapValueIntoElement);

  return elements;
};

const getStringEnd = (state, values) => {
  switch (state) {
    case 'added': {
      const element = getStringElementsFromValues(values);
      return `was added with value: ${element}`;
    }
    case 'deleted':
      return 'was deleted';
    case 'changed': {
      const [elementBefore, elementAfter] = getStringElementsFromValues(values);
      return `was changed from ${elementBefore} to ${elementAfter}`;
    }
    case 'unchanged':
      return null;
    default:
      throw new Error(`Unknown state ${state}!`);
  }
};

const render = (ast) => {
  const iter = (tree, names) => {
    const renderedAst = tree.reduce((acc, subTree) => {
      const {
        name,
        state,
        values,
        children,
      } = subTree;

      if (!isNull(children)) {
        const currentNames = [...names, name];
        return [...acc, iter(children, currentNames)];
      }
      if (state === 'unchanged') {
        return acc;
      }

      const currentNames = [...names, name];
      const nextString = `Property '${currentNames.join('.')}' ${getStringEnd(state, values)}`;

      return [...acc, nextString];
    }, []);

    return renderedAst.join('\n');
  };

  return iter(ast, []);
};

export default render;
