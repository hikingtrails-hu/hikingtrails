require('alias-hq').get('module-alias')

const { server } = require('./dist/apps/server/server')

console.log({ server: server() })
