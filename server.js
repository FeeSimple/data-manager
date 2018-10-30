const http = require('http')
const https = require('https')
const express = require('express')
const redirectHttps = require('redirect-https')

const PROD = false
const lex = require('greenlock-express').create({
  version: 'draft-11',
  server: PROD
    ? 'https://acme-v02.api.letsencrypt.org/directory'
    : 'https://acme-staging-v02.api.letsencrypt.org/directory',
  approveDomains: (opts, certs, cb) => {
    if (certs) {
      opts.domains = ['feesimple.io', 'www.feesimple.io']
    } else {
      opts.email = 'mtsalenc@feesimple.io'
      opts.agreeTos = true
    }
    cb(null, { options: opts, certs: certs })
  }
})

const middlewareWrapper = lex.middleware
const app = express()
app.use(express.static('build'))

http.createServer(lex.middleware(redirectHttps())).listen(80)
https.createServer(middlewareWrapper(app)).listen(443)
