import _ from 'lodash';

const buildAst = (objectBefore, objectAfter) => {
  const keys = _.union(Object.keys(objectBefore), Object.keys(objectAfter));

  return keys.map((key) => {
    if (!_.has(objectBefore, key)) {
      return { key, state: 'added', value: objectAfter[key] };
    }

    if (!_.has(objectAfter, key)) {
      return { key, state: 'deleted', value: objectBefore[key] };
    }

    if (_.isObject(objectBefore[key]) && _.isObject(objectAfter[key])) {
      return { key, state: 'nested', children: buildAst(objectBefore[key], objectAfter[key]) };
    }

    if (objectBefore[key] === objectAfter[key]) {
      return { key, state: 'unchanged', value: objectBefore[key] };
    }

    return {
      key,
      state: 'changed',
      oldValue: objectBefore[key],
      newValue: objectAfter[key],
    };
  });
};

export default buildAst;
