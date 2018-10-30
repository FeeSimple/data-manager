const express = require('express')

const environment = process.env.ENVIRONMENT
if(environment !== 'PRODUCTION' && environment !== 'TESTING') {
  console.error('Error: .env variable ENVIRONMENT should be either PRODUCTION or TESTING')
  process.exit()
}

const PROD = environment === 'PRODUCTION'? true : false
const app = express()
app.use(express.static('build'))

require('greenlock-express').create({
  version: 'draft-11',
  server: PROD
    ? 'https://acme-v02.api.letsencrypt.org/directory'
    : 'https://acme-staging-v02.api.letsencrypt.org/directory',
  configDir: '~/.config/acme/',
  email: 'mtsalenc@gmail.com',
  approveDomains: [ 'fsmanager.io', 'www.fsmanager.io' ],
  agreeTos: true,
  app
}).listen(80, 443)

