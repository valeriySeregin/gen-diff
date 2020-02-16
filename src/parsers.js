import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (filename) => {
  const pathToFile = path.join(process.cwd(), filename);
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const extension = path.extname(pathToFile);

  const extensionsDict = {
    '.json': (file) => JSON.parse(file),
    '.yml': (file) => yaml.safeLoad(file),
    '.ini': (file) => ini.parse(file),
  };

  const parseFile = extensionsDict[extension];

  return parseFile(fileContent);
};

export default parse;
