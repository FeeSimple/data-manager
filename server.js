const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();
app.use(express.static(process.env.SERVE_DIRECTORY || 'build'));

const options = {
  key: fs.readFileSync('key.pem', 'utf8'),
  cert: fs.readFileSync('cert.pem', 'utf8'),
  passphrase: process.env.HTTPS_PASSPHRASE || ''
};
const server = https.createServer(options, app);

server.listen(process.env.SERVER_PORT || 80);