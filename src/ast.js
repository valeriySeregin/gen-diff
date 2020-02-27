import {
  union,
  isObject,
  isUndefined,
} from 'lodash';

const isBothValuesObjects = (val1, val2) => isObject(val1) && isObject(val2);

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
  switch (status) {
    case 'added':
      return [null, after];
    case 'removed':
      return [before, null];
    case 'changed':
      return [before, after];
    case 'unchanged':
      return [before, null];
    default:
      throw new Error(`Unknown status ${status}!`);
  }
};

const getAst = (before, after) => {
  const uniqPropertiesNames = union(Object.keys(before), Object.keys(after));

  const ast = uniqPropertiesNames.reduce((acc, name) => {
    const valueBefore = before[name];
    const valueAfter = after[name];
    const predicate = isBothValuesObjects(valueBefore, valueAfter);

    const status = predicate ? 'unchanged' : compareValues(valueBefore, valueAfter);
    const values = predicate ? null : getValuesRightOrder(valueBefore, valueAfter, status);
    const children = predicate ? getAst(valueBefore, valueAfter) : null;

    return [
      ...acc,
      {
        name,
        status,
        values,
        children,
      },
    ];
  }, []);

  return ast;
};

export default getAst;
