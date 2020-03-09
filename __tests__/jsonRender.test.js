import generateDiff from '../src';
import readFile from '../src/utils';

test('render ini in json', () => {
  const receivedDiff = generateDiff('__fixtures__/before.ini', '__fixtures__/after.ini', 'json');
  const received = JSON.parse(receivedDiff);
  const expected = JSON.parse(readFile('__fixtures__/expectedJson.json'));
  expect(received).toStrictEqual(expected);
});
