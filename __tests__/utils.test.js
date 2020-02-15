import parse from '../src/parsers';
import getDiffString from '../src/utils';

const firstObjectFromJson = parse('__fixtures__/before.json');
const secondObjectFromJson = parse('__fixtures__/after.json');

test('passes when diff is equal to difference between before.json and after.json', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  const received = getDiffString(firstObjectFromJson, secondObjectFromJson);

  expect(received).toMatch(expected);
});

test('passes when before.json and after.json switched', () => {
  const expected = `{
  + timeout: 50
  - timeout: 20
  - verbose: true
    host: hexlet.io
  + proxy: 123.234.53.22
  + follow: false
}`;

  const received = getDiffString(secondObjectFromJson, firstObjectFromJson);

  expect(received).toMatch(expected);
});

const firstObjectFromYaml = parse('__fixtures__/before.yml');
const secondObjectFromYaml = parse('__fixtures__/after.yml');

test('passes when diff is equal to difference between before.yml and after.yml', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  const received = getDiffString(firstObjectFromYaml, secondObjectFromYaml);

  expect(received).toMatch(expected);
});

test('passes when before.yml and after.yml switched', () => {
  const expected = `{
  + timeout: 50
  - timeout: 20
  - verbose: true
    host: hexlet.io
  + proxy: 123.234.53.22
  + follow: false
}`;

  const received = getDiffString(secondObjectFromYaml, firstObjectFromYaml);

  expect(received).toMatch(expected);
});
