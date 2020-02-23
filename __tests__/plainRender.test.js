import parse from '../src/parsers';
import getAst from '../src/ast';
import render from '../src/formatters/plainRender';

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
  [parse('__fixtures__/before.json'), parse('__fixtures__/after.json')],
  [parse('__fixtures__/before.yml'), parse('__fixtures__/after.yml')],
  [parse('__fixtures__/before.ini'), parse('__fixtures__/after.ini')],
])('getDiffString(%o, %o)', (obj1, obj2) => {
  const ast = getAst(obj1, obj2);
  const received = render(ast);
  expect(received).toMatch(expected);
});
