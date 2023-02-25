.PHONY: dev test depcheck format-code lint verify dev

BIN=node_modules/.bin
PRETTIER=$(BIN)/prettier
TSC=$(BIN)/tsc
REMIX=$(BIN)/remix

default: dist

node_modules: package.json yarn.lock
	yarn --frozen-lockfile
	touch node_modules

format-code: node_modules
	$(PRETTIER) --write .

lint: node_modules
	$(PRETTIER) --check .
	$(BIN)/eslint

depcheck: node_modules
	$(BIN)/depcheck

verify: depcheck lint check-types test

test: node_modules
	$(BIN)/jest --coverage

dist: node_modules
	scripts/dist-tsconfig > tsconfig.dist.json
	$(TSC) -p ./tsconfig.dist.json --pretty

check-types: node_modules
	$(TSC) -p . --noEmit

start-docker:
	docker-compose up -d

stop-docker:
	docker-compose stop

remix-dev: node_modules
	scripts/is-remix-app
	make init-remix-app
	$(REMIX) dev

remix-build: node_modules
	scripts/is-remix-app
	make init-remix-app
	$(REMIX) build


dev: node_modules
#	$(BIN)/wait-port 8682
#	$(BIN)/nodemon

init-remix-app:
	rm -rf public
	cp -R src/apps/${REMIX_APP}/public .
