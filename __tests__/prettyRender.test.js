import generateDiff from '../src';
import readFile from '../src/utils';

test('render yml in pretty', () => {
  const received = generateDiff('__fixtures__/before.yml', '__fixtures__/after.yml', 'plain');
  const expected = readFile('__fixtures__/expectedPretty.txt');
  expect(received).toStrictEqual(expected);
});
