install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js'

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

publish:
	npm publish

.PHONY: test