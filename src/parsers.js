import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (fileData, config) => {
  const extension = path.extname(config);

  const parsers = {
    '.json': (content) => JSON.parse(content),
    '.yml': (content) => yaml.safeLoad(content),
    '.ini': (content) => ini.parse(content),
  };

  const parseFile = parsers[extension];

  return parseFile(fileData);
};

export default parse;
