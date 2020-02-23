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
    return 'removed';
  }
  if (before === after) {
    return 'unchanged';
  }

  return 'changed';
};

const getValuesRightOrder = (before, after, status) => {
  if (status === 'added') {
    return [null, after];
  }
  if (status === 'changed') {
    return [before, after];
  }

  return [before, null];
};

const getAst = (before, after) => {
  const uniqPropertiesNames = union(Object.keys(before), Object.keys(after));

  const ast = uniqPropertiesNames.reduce((acc, name) => {
    const valueBefore = before[name];
    const valueAfter = after[name];

    if (isObject(valueBefore) && isObject(valueAfter)) {
      return [
        ...acc,
        {
          name,
          status: 'unchanged',
          values: null,
          children: getAst(valueBefore, valueAfter),
        },
      ];
    }

    const status = compareValues(valueBefore, valueAfter);
    const values = getValuesRightOrder(valueBefore, valueAfter, status);

    return [
      ...acc,
      {
        name,
        status,
        values,
        children: null,
      },
    ];
  }, []);

  return ast;
};

export default getAst;
