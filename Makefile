.PHONY: dev test depcheck format-code lint verify dev init-remix-app app-dev remix-dev init

ifneq (,$(wildcard ./.env))
    include .env
    export
endif

BIN=node_modules/.bin
PRETTIER=$(BIN)/prettier
TSC=$(BIN)/tsc
REMIX=$(BIN)/remix
TSNODE=$(BIN)/ts-node -r tsconfig-paths/register

ifdef REMIX_APP
	TARGET=public
else
	TARGET=dist
endif

default: $(TARGET)

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
	scripts/resolve-imports

check-types: node_modules
	$(TSC) -p . --noEmit

start-docker:
	docker-compose up -d

stop-docker:
	docker-compose stop

remix-dev: node_modules init-remix-app
	$(REMIX) dev

public: node_modules
	scripts/is-remix-app
	make init-remix-app
	$(REMIX) build

dev: node_modules
	scripts/start-dev

app-dev: ensure-pubsub-setup
	$(BIN)/nodemon

init-remix-app:
	rm -rf public
	cp -R src/apps/${REMIX_APP}/public .

.env: .env.development
	cp .env.development .env

init: .env node_modules

trigger-load-request: ensure-pubsub-setup
	$(TSNODE) dev/trigger-load-request.ts

reset-pubsub: ensure-pubsub-setup
	$(TSNODE) dev/reset-pubsub.ts

ensure-pubsub-setup: node_modules start-docker
	$(TSNODE) dev/ensure-pubsub-setup.ts
