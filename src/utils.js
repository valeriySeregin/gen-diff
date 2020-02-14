import { has, union } from 'lodash';

const getDiffString = (before, after) => {
  const keysFromBothObjects = union(Object.keys(before), Object.keys(after));
  const diffArr = keysFromBothObjects.reduce((acc, key) => {
    if (has(after, key) && has(before, key)) {
      if (after[key] === before[key]) {
        return acc.concat(`    ${key}: ${after[key]}`);
      }

      return acc.concat(`  + ${key}: ${after[key]}`).concat(`  - ${key}: ${before[key]}`);
    }

    if (has(after, key) && !has(before, key)) {
      return acc.concat(`  + ${key}: ${after[key]}`);
    }

    return acc.concat(`  - ${key}: ${before[key]}`);
  }, []);

  return `{\n${diffArr.join('\n')}\n}`;
};

export default getDiffString;
