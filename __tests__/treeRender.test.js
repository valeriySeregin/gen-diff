import generateDiff from '../src';
import readFile from '../src/utils';

test('render json in tree', () => {
  const received = generateDiff('__fixtures__/before.json', '__fixtures__/after.json', 'tree');
  const expected = readFile('__fixtures__/expectedTree.txt');
  expect(received).toStrictEqual(expected);
});
