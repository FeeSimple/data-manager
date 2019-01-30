const express = require('express')
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/fsmanager.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/fsmanager.io/fullchain.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express()
app.use(express.static('build'))
app.get('/*', (undefined, res) => {
  res.sendFile(path.resolve('', 'build', 'index.html'));
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(80)
httpsServer.listen(443)

console.info('Server online')