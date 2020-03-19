import fs from 'fs';
import path from 'path';
import generateDiff from '../src';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

test.each([
  ['before.ini', 'after.ini', 'json', 'expectedJson.json'],
  ['before.yml', 'after.yml', 'tree', 'expectedTree.txt'],
  ['before.json', 'after.json', 'plain', 'expectedPretty.txt'],
])('gendiff(%s, %s, %s)', (filename1, filename2, format, expected) => {
  const firstPath = getPath(filename1);
  const secondPath = getPath(filename2);
  const result = readFile(getPath(expected));
  const received = generateDiff(firstPath, secondPath, format);
  expect(received).toEqual(result);
});
