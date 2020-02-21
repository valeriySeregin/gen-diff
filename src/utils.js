import {
  union,
  isObject,
  isUndefined,
} from 'lodash';

const compareValues = (before, after) => {
  if (isUndefined(before) && !isUndefined(after)) {
    return 'added';
  }
  if (!isUndefined(before) && isUndefined(after)) {
    return 'deleted';
  }
  if (before === after) {
    return 'unchanged';
  }

  return 'changed';
};

const getAst = (before, after) => {
  const keysFromBothObjects = union(Object.keys(before), Object.keys(after));

  const ast = keysFromBothObjects.reduce((acc, key) => {
    const beforeValue = before[key];
    const afterValue = after[key];

    if (isObject(beforeValue) && isObject(afterValue)) {
      return [...acc, {
        name: key,
        status: 'unchanged',
        value: null,
        children: getAst(beforeValue, afterValue),
      }];
    }

    const comparisonResult = compareValues(beforeValue, afterValue);

    if (comparisonResult === 'added') {
      return [...acc, {
        name: key,
        status: comparisonResult,
        value: afterValue,
        children: null,
      }];
    }

    if (comparisonResult === 'deleted') {
      return [...acc, {
        name: key,
        status: comparisonResult,
        value: beforeValue,
        children: null,
      }];
    }

    if (comparisonResult === 'changed') {
      return [...acc, {
        name: key,
        status: 'deleted',
        value: beforeValue,
        children: null,
      },
      {
        name: key,
        status: 'added',
        value: afterValue,
        children: null,
      }];
    }

    return [...acc, {
      name: key,
      status: 'unchanged',
      value: beforeValue,
      children: null,
    }];
  }, []);

  return ast;
};

export default getAst;
