require('alias-hq').get('module-alias')

const { server } = require('./dist/apps/worker/server')

console.log({ server: server() })
