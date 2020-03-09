import _ from 'lodash';

const compareValues = (valueBefore, valueAfter) => {
  if (_.isUndefined(valueBefore) && !_.isUndefined(valueAfter)) {
    return 'added';
  }
  if (!_.isUndefined(valueBefore) && _.isUndefined(valueAfter)) {
    return 'deleted';
  }
  if (valueBefore === valueAfter) {
    return 'unchanged';
  }

  return 'changed';
};

const getRightOrderOfValues = (valueBefore, valueAfter, state) => {
  switch (state) {
    case 'added':
      return [null, valueAfter];
    case 'deleted':
      return [valueBefore, null];
    case 'changed':
      return [valueBefore, valueAfter];
    case 'unchanged':
      return [valueBefore, null];
    default:
      throw new Error(`Unknown state ${state}!`);
  }
};

const buildAst = (objectBefore, objectAfter) => {
  const keys = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  const ast = keys.map((name) => {
    const valueBefore = objectBefore[name];
    const valueAfter = objectAfter[name];

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return {
        name,
        state: 'unchanged',
        values: null,
        children: buildAst(valueBefore, valueAfter),
      };
    }

    const state = compareValues(valueBefore, valueAfter);

    return {
      name,
      state,
      values: getRightOrderOfValues(valueBefore, valueAfter, state),
      children: null,
    };
  });

  return ast;
};

export default buildAst;
