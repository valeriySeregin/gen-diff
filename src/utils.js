export const getDiffString = (before, after, keys) => {
  const diffArr = keys.reduce((acc, key) => {
    if (after.hasOwnProperty(key) && before.hasOwnProperty(key)) {
      if (after[key] === before[key]) {
        return acc.concat(`    ${key}: ${after[key]}`);
      }

      return acc.concat(`+ ${key}: ${after[key]}`).concat(`- ${key}: ${before[key]}`);
    }

    if (after.hasOwnProperty(key) && !before.hasOwnProperty(key)) {
      return acc.concat(`+ ${key}: ${after[key]}`);
    }

    return acc.concat(`- ${key}: ${before[key]}`);
  }, []);

  return `{\n${diffArr.join('\n  ')}\n}`;
};

export const getIndividualKeys = (objKeys1, objKeys2) => objKeys1.reduce((acc, item) => (
    acc.includes(item) ? acc : acc.concat(item)
  ), objKeys2);
