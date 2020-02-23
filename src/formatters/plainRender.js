import {
  isNull,
  isObject,
} from 'lodash';

const getNotNull = (arr) => {
  const [firstValue, secondValue] = arr;
  if (isNull(firstValue)) {
    return secondValue;
  }

  return firstValue;
};

const getTemplate = (status, values) => {
  if (status === 'added') {
    const filledValue = getNotNull(values);
    if (isObject(filledValue)) {
      return 'was added with value: [complex value]';
    }

    if (typeof filledValue === 'string') {
      return `was added with value: '${filledValue}'`;
    }

    return `was added with value: ${filledValue}`;
  }

  if (status === 'removed') {
    return 'was deleted';
  }

  if (status === 'changed') {
    const [firstValue, secondValue] = values;
    if (isObject(firstValue)) {
      if (typeof secondValue === 'string') {
        return `was changed from [complex value] to '${secondValue}'`;
      }

      return `was changed from [complex value] to ${secondValue}`;
    }

    if (isObject(secondValue)) {
      if (typeof firstValue === 'string') {
        return `was changed from '${firstValue}' to [complex value]`;
      }

      return `was changed from ${firstValue} to [complex value]`;
    }

    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
      return `was changed from '${firstValue}' to '${secondValue}'`;
    }

    if (typeof firstValue === 'string') {
      return `was changed from '${firstValue}' to ${secondValue}`;
    }

    if (typeof secondValue === 'string') {
      return `was changed from ${firstValue} to '${secondValue}'`;
    }

    return `was changed from ${firstValue} to ${secondValue}`;
  }

  return null;
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
        return [...acc, iter(children, [...names, name])];
      }

      if (status === 'unchanged') {
        return acc;
      }

      const currentNames = [...names, name];

      return [...acc, `Property '${currentNames.join('.')}' ${getTemplate(status, values)}`];
    }, []);

    return content.join('\n');
  };

  return iter(ast, []);
};

export default render;
