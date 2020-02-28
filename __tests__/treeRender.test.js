import generateDiff from '../src';

const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

test.each([
  ['__fixtures__/before.json', '__fixtures__/after.json', 'tree'],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', 'tree'],
  ['__fixtures__/before.ini', '__fixtures__/after.ini', 'tree'],
])('getDiff(%s, %s)', (path1, path2, format) => {
  const received = generateDiff(path1, path2, format);
  expect(received).toMatch(expected);
});
