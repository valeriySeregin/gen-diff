import _ from 'lodash';

const buildAst = (objectBefore, objectAfter) => {
  const keys = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  return keys.map((key) => {
    const valueBefore = objectBefore[key];
    const valueAfter = objectAfter[key];
    if (valueBefore === valueAfter) {
      return { key, state: 'unchanged', value: valueBefore };
    }

    if (_.isUndefined(valueBefore, key) && !_.isUndefined(valueAfter, key)) {
      return { key, state: 'added', value: valueAfter };
    }

    if (!_.isUndefined(valueBefore, key) && _.isUndefined(valueAfter, key)) {
      return { key, state: 'deleted', value: valueBefore };
    }

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return { key, state: 'nested', children: buildAst(valueBefore, valueAfter) };
    }

    return {
      key,
      state: 'changed',
      oldValue: valueBefore,
      newValue: valueAfter,
    };
  });
};

export default buildAst;
