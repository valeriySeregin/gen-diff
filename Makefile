install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js' -h

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run

.PHONY: test