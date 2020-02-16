import parse from '../src/parsers';
import getDiffString from '../src/utils';

const expected1 = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const expected2 = `{
  + timeout: 50
  - timeout: 20
  - verbose: true
    host: hexlet.io
  + proxy: 123.234.53.22
  + follow: false
}`;

test.each([
  [parse('__fixtures__/before.json'), parse('__fixtures__/after.json')],
  [parse('__fixtures__/before.yml'), parse('__fixtures__/after.yml')],
  [parse('__fixtures__/before.ini'), parse('__fixtures__/after.ini')],
])('getDiffString(%o, %o)', (obj1, obj2) => {
  expect(getDiffString(obj1, obj2)).toMatch(expected1);
});

test.each([
  [parse('__fixtures__/after.json'), parse('__fixtures__/before.json')],
  [parse('__fixtures__/after.yml'), parse('__fixtures__/before.yml')],
  [parse('__fixtures__/after.ini'), parse('__fixtures__/before.ini')],
])('getDiffString(%o, %o)', (obj1, obj2) => {
  expect(getDiffString(obj1, obj2)).toMatch(expected2);
});
