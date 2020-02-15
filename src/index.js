import getDiffString from './utils';
import parse from './parsers';

export default (firstConfig, secondConfig) => {
  const firstObject = parse(firstConfig);
  const secondObject = parse(secondConfig);

  return getDiffString(firstObject, secondObject);
};
