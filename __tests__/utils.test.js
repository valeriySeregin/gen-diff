import path from 'path';
import fs from 'fs';
import getDiffString from '../src/utils.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const beforeFixture = readFile('before.json');
const afterFixture = readFile('after.json');
const firstObjectFromJson = JSON.parse(beforeFixture);
const secondObjectFromJson = JSON.parse(afterFixture);

test('passes when diff is equal to difference between before and after', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  expect(getDiffString(firstObjectFromJson, secondObjectFromJson)).toMatch(expected);
});

test('passes when diff is equal to difference between after and before', () => {
  const expected = `{
  + timeout: 50
  - timeout: 20
  - verbose: true
    host: hexlet.io
  + proxy: 123.234.53.22
  + follow: false
}`;

  expect(getDiffString(secondObjectFromJson, firstObjectFromJson)).toMatch(expected);
});
