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
  if (req.secure) {
    // OK, continue
    return next()
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url) // express 4.x
}
