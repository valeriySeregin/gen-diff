import parse from '../src/parsers';
import getAst from '../src/ast';
import render from '../src/formatters/jsonRender';

const expected = [
  {
    name: 'common',
    status: 'unchanged',
    values: null,
    children:
  [
    {
      name: 'setting1', status: 'unchanged', values: ['Value 1', null], children: null,
    },
    {
      name: 'setting2', status: 'removed', values: [200, null], children: null,
    },
    {
      name: 'setting3', status: 'changed', values: [true, { key: 'value' }], children: null,
    },
    {
      name: 'setting6',
      status: 'unchanged',
      values: null,
      children:
      [
        {
          name: 'key', status: 'unchanged', values: ['value', null], children: null,
        },
        {
          name: 'ops', status: 'added', values: [null, 'vops'], children: null,
        },
      ],
    },
    {
      name: 'follow', status: 'added', values: [null, false], children: null,
    },
    {
      name: 'setting4', status: 'added', values: [null, 'blah blah'], children: null,
    },
    {
      name: 'setting5', status: 'added', values: [null, { key5: 'value5' }], children: null,
    },
  ],
  },
  {
    name: 'group1',
    status: 'unchanged',
    values: null,
    children:
    [
      {
        name: 'baz', status: 'changed', values: ['bas', 'bars'], children: null,
      },
      {
        name: 'foo', status: 'unchanged', values: ['bar', null], children: null,
      },
      {
        name: 'nest', status: 'changed', values: [{ key: 'value' }, 'str'], children: null,
      },
    ],
  },
  {
    name: 'group2', status: 'removed', values: [{ abc: 12345 }, null], children: null,
  },
  {
    name: 'group3', status: 'added', values: [null, { fee: 100500 }], children: null,
  },
];

test.each([
  [parse('__fixtures__/before.json'), parse('__fixtures__/after.json')],
  [parse('__fixtures__/before.ini'), parse('__fixtures__/after.ini')],
  [parse('__fixtures__/before.yml'), parse('__fixtures__/after.yml')],
])('getDiffString(%o, %o)', (obj1, obj2) => {
  const ast = getAst(obj1, obj2);
  const receivedString = render(ast);
  const received = JSON.parse(receivedString);
  expect(received).toStrictEqual(expected);
});
