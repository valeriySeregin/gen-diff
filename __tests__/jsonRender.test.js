import generateDiff from '../src';

const expected = [
  {
    name: 'common',
    state: 'unchanged',
    values: null,
    children:
  [
    {
      name: 'setting1', state: 'unchanged', values: ['Value 1', null], children: null,
    },
    {
      name: 'setting2', state: 'deleted', values: [200, null], children: null,
    },
    {
      name: 'setting3', state: 'changed', values: [true, { key: 'value' }], children: null,
    },
    {
      name: 'setting6',
      state: 'unchanged',
      values: null,
      children:
      [
        {
          name: 'key', state: 'unchanged', values: ['value', null], children: null,
        },
        {
          name: 'ops', state: 'added', values: [null, 'vops'], children: null,
        },
      ],
    },
    {
      name: 'follow', state: 'added', values: [null, false], children: null,
    },
    {
      name: 'setting4', state: 'added', values: [null, 'blah blah'], children: null,
    },
    {
      name: 'setting5', state: 'added', values: [null, { key5: 'value5' }], children: null,
    },
  ],
  },
  {
    name: 'group1',
    state: 'unchanged',
    values: null,
    children:
    [
      {
        name: 'baz', state: 'changed', values: ['bas', 'bars'], children: null,
      },
      {
        name: 'foo', state: 'unchanged', values: ['bar', null], children: null,
      },
      {
        name: 'nest', state: 'changed', values: [{ key: 'value' }, 'str'], children: null,
      },
    ],
  },
  {
    name: 'group2', state: 'deleted', values: [{ abc: 12345 }, null], children: null,
  },
  {
    name: 'group3', state: 'added', values: [null, { fee: 100500 }], children: null,
  },
];

test.each([
  ['__fixtures__/before.json', '__fixtures__/after.json', 'json'],
  ['__fixtures__/before.ini', '__fixtures__/after.ini', 'json'],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', 'json'],
])('getDiff(%s, %s, %s)', (path1, path2, format) => {
  const receivedDiff = generateDiff(path1, path2, format);
  const received = JSON.parse(receivedDiff);
  expect(received).toStrictEqual(expected);
});
