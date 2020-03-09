import generateDiff from '../src';
import readFile from '../src/utils';

const expected = readFile('__fixtures__/expectedPretty.txt');

test.each([
  ['__fixtures__/before.json', '__fixtures__/after.json', 'tree'],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', 'tree'],
  ['__fixtures__/before.ini', '__fixtures__/after.ini', 'tree'],
])('getDiff(%s, %s, %s)', (path1, path2, format) => {
  const received = generateDiff(path1, path2, format);
  expect(received).toMatch(expected);
});
