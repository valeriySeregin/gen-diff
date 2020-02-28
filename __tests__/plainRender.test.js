import generateDiff from '../src';

const expected = `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`;

test.each([
  ['__fixtures__/before.ini', '__fixtures__/after.ini', 'plain'],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', 'plain'],
  ['__fixtures__/before.json', '__fixtures__/after.json', 'plain'],
])('getDiff(%s, %s, %s)', (path1, path2, format) => {
  const received = generateDiff(path1, path2, format);
  expect(received).toMatch(expected);
});
