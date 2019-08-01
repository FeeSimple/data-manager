const express = require('express')
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/fsmanager.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/fsmanager.io/fullchain.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express()

const httpApp = express()

httpApp.set('port', process.env.PORT || 80);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});

app.use(express.static('build'))
app.get('/*', (undefined, res) => {
  res.sendFile(path.resolve('', 'build', 'index.html'));
})

const httpServer = http.createServer(httpApp)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(80)
httpsServer.listen(443)

console.info('Server online')
