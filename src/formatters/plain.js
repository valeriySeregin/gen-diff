import _ from 'lodash';

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
  const filledValues = values.filter((value) => !_.isNull(value));
  const elements = filledValues.map(mapValueIntoElement);

  return elements;
};

const getString = (state, values, names) => {
  const template = `Property '${names.join('.')}'`;
  switch (state) {
    case 'added': {
      const [element] = getStringElementsFromValues(values);
      return `${template} was added with value: ${element}`;
    }
    case 'deleted':
      return `${template} was deleted`;
    case 'changed': {
      const [elementBefore, elementAfter] = getStringElementsFromValues(values);
      return `${template} was changed from ${elementBefore} to ${elementAfter}`;
    }
    case 'unchanged':
      return '';
    default:
      throw new Error(`Unknown state ${state}!`);
  }
};

const render = (ast) => {
  const iter = (tree, oldNames) => {
    const renderedAst = tree.map((subTree) => {
      const {
        name,
        state,
        values,
        children,
      } = subTree;

      const newNames = [...oldNames, name];
      const nextString = !_.isNull(children)
        ? iter(children, newNames) : getString(state, values, newNames);

      return nextString;
    });

    return renderedAst
      .filter((string) => string !== '')
      .join('\n');
  };

  return iter(ast, []);
};

export default render;
