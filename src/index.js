import path from 'path';
import fs from 'fs';
import getDiffString from './utils.js';

const getFilePath = (filename) => path.join(process.cwd(), filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

export default (firstConfig, secondConfig) => {
  const firstJson = readFile(firstConfig);
  const secondJson = readFile(secondConfig);

  const firstObjectFromJson = JSON.parse(firstJson);
  const secondObjectFromJson = JSON.parse(secondJson);

  return getDiffString(firstObjectFromJson, secondObjectFromJson);
};
