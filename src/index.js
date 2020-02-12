import fs from 'fs';
import { getIndividualKeys, getDiffString } from './utils.js';

export default (firstConfig, secondConfig) => {
  const firstJson = fs.readFileSync(firstConfig).toString();
  const secondJson = fs.readFileSync(secondConfig).toString();

  const firstObjectFromJson = JSON.parse(firstJson);
  const secondObjectFromJson = JSON.parse(secondJson);

  const firstObjKeys = Object.keys(firstObjectFromJson);
  const secondObjKeys = Object.keys(secondObjectFromJson);

  const individualKeys = getIndividualKeys(firstObjKeys, secondObjKeys);

  return getDiffString(secondObjectFromJson, firstObjectFromJson, individualKeys);
};
