import yaml from 'js-yaml';
import ini from 'ini';

export default (data, type) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };

  const parseFile = parsers[type];

  return parseFile(data);
};
