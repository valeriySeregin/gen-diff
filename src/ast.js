import _ from 'lodash';

const isBothValuesObjects = (val1, val2) => _.isObject(val1) && _.isObject(val2);

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
  const uniqPropertiesNames = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  const ast = uniqPropertiesNames.reduce((acc, name) => {
    const valueBefore = objectBefore[name];
    const valueAfter = objectAfter[name];
    const predicate = isBothValuesObjects(valueBefore, valueAfter);

    const state = predicate ? 'unchanged' : compareValues(valueBefore, valueAfter);
    const values = predicate ? null : getRightOrderOfValues(valueBefore, valueAfter, state);
    const children = predicate ? buildAst(valueBefore, valueAfter) : null;

    return [
      ...acc,
      {
        name,
        state,
        values,
        children,
      },
    ];
  }, []);

  return ast;
};

export default buildAst;
