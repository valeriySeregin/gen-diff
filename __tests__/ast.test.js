import buildAst from '../src/ast';

const expected = [
  {
    children:
    [
      {
        children: null, name: 'setting1', state: 'unchanged', values: ['Value 1', null],
      },
      {
        children: null, name: 'setting2', state: 'deleted', values: [200, null],
      },
      {
        children: null, name: 'setting3', state: 'changed', values: [true, { key: 'value' }],
      },
      {
        children:
        [
          {
            children: null, name: 'key', state: 'unchanged', values: ['value', null],
          },
          {
            children: null, name: 'ops', state: 'added', values: [null, 'vops'],
          },
        ],
        name: 'setting6',
        state: 'unchanged',
        values: null,
      },
      {
        children: null, name: 'follow', state: 'added', values: [null, false],
      },
      {
        children: null, name: 'setting4', state: 'added', values: [null, 'blah blah'],
      },
      {
        children: null, name: 'setting5', state: 'added', values: [null, { key5: 'value5' }],
      },
    ],
    name: 'common',
    state: 'unchanged',
    values: null,
  },
  {
    children:
    [{
      children: null, name: 'baz', state: 'changed', values: ['bas', 'bars'],
    },
    {
      children: null, name: 'foo', state: 'unchanged', values: ['bar', null],
    },
    {
      children: null, name: 'nest', state: 'changed', values: [{ key: 'value' }, 'str'],
    },
    ],
    name: 'group1',
    state: 'unchanged',
    values: null,
  },
  {
    children: null, name: 'group2', state: 'deleted', values: [{ abc: 12345 }, null],
  },
  {
    children: null, name: 'group3', state: 'added', values: [null, { fee: 100500 }],
  },
];

const objBefore = {
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

const objAfter = {
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

const received = buildAst(objBefore, objAfter);

test('generate AST', () => {
  expect(received).toEqual(expected);
});
