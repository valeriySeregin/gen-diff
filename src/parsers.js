import yaml from 'js-yaml';
import ini from 'ini';

export default (fileData, extension) => {
  const parsers = {
    '.json': (content) => JSON.parse(content),
    '.yml': (content) => yaml.safeLoad(content),
    '.ini': (content) => ini.parse(content),
  };

  const parseFile = parsers[extension];

  return parseFile(fileData);
};
