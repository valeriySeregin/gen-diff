import getAst from '../src/ast';

const expected = [
  {
    children:
    [
      {
        children: null, name: 'setting1', status: 'unchanged', values: ['Value 1', null],
      },
      {
        children: null, name: 'setting2', status: 'removed', values: [200, null],
      },
      {
        children: null, name: 'setting3', status: 'changed', values: [true, { key: 'value' }],
      },
      {
        children:
        [
          {
            children: null, name: 'key', status: 'unchanged', values: ['value', null],
          },
          {
            children: null, name: 'ops', status: 'added', values: [null, 'vops'],
          },
        ],
        name: 'setting6',
        status: 'unchanged',
        values: null,
      },
      {
        children: null, name: 'follow', status: 'added', values: [null, false],
      },
      {
        children: null, name: 'setting4', status: 'added', values: [null, 'blah blah'],
      },
      {
        children: null, name: 'setting5', status: 'added', values: [null, { key5: 'value5' }],
      },
    ],
    name: 'common',
    status: 'unchanged',
    values: null,
  },
  {
    children:
    [{
      children: null, name: 'baz', status: 'changed', values: ['bas', 'bars'],
    },
    {
      children: null, name: 'foo', status: 'unchanged', values: ['bar', null],
    },
    {
      children: null, name: 'nest', status: 'changed', values: [{ key: 'value' }, 'str'],
    },
    ],
    name: 'group1',
    status: 'unchanged',
    values: null,
  },
  {
    children: null, name: 'group2', status: 'removed', values: [{ abc: 12345 }, null],
  },
  {
    children: null, name: 'group3', status: 'added', values: [null, { fee: 100500 }],
  },
];

const before = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
  },
};

const after = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: {
      key: 'value',
    },
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    fee: 100500,
  },
};

const received = getAst(before, after);

test('generate AST', () => {
  expect(received).toEqual(expected);
});
