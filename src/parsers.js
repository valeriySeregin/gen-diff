import yaml from 'js-yaml';
import ini from 'ini';

export default (fileData, type) => {
  const parsers = {
    json: (content) => JSON.parse(content),
    yml: (content) => yaml.safeLoad(content),
    ini: (content) => ini.parse(content),
  };

  const parseFile = parsers[type];

  return parseFile(fileData);
};
