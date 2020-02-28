import parse from '../src/parsers';
import buildAst from '../src/ast';
import render from '../src/formatters/tree';

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
  [parse('__fixtures__/before.json'), parse('__fixtures__/after.json')],
  [parse('__fixtures__/before.yml'), parse('__fixtures__/after.yml')],
  [parse('__fixtures__/before.ini'), parse('__fixtures__/after.ini')],
])('getDiffString(%o, %o)', (obj1, obj2) => {
  const ast = buildAst(obj1, obj2);
  const received = render(ast);
  expect(received).toMatch(expected);
});
