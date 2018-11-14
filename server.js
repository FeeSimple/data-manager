const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const app = express()
app.use('*', ensureSecure)
app.use(express.static('build'))

const options = {
  key: fs.readFileSync('./sslcert/privkey.pem', 'utf8'),
  cert: fs.readFileSync('./sslcert/fullchain.pem', 'utf8')
}

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

function ensureSecure (req, res, next) {
  if (req.secure) return next()
  res.redirect('https://' + req.hostname + req.url)
}
