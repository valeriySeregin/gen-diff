import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (filename) => {
  const pathToFile = path.join(process.cwd(), filename);
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const extension = path.extname(pathToFile);

  const parsers = {
    '.json': (content) => JSON.parse(content),
    '.yml': (content) => yaml.safeLoad(content),
    '.ini': (content) => ini.parse(content),
  };

  const parseFile = parsers[extension];

  return parseFile(fileContent);
};

export default parse;
