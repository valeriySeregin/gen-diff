install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js' __fixtures__/before.yml __fixtures__/after.yml
	npx babel-node 'src/bin/gendiff.js' -f plain __fixtures__/before.ini __fixtures__/after.ini
	npx babel-node 'src/bin/gendiff.js' --format json __fixtures__/before.json __fixtures__/after.json

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test