import generateDiff from '../src';
import readFile from '../src/utils';

const expected = JSON.parse(readFile('__fixtures__/expectedJson.json'));

test.each([
  ['__fixtures__/before.json', '__fixtures__/after.json', 'json'],
  ['__fixtures__/before.ini', '__fixtures__/after.ini', 'json'],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', 'json'],
])('getDiff(%s, %s, %s)', (path1, path2, format) => {
  const receivedDiff = generateDiff(path1, path2, format);
  const received = JSON.parse(receivedDiff);
  expect(received).toStrictEqual(expected);
});
