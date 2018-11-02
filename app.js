const express = require('express');
const path = require('path');
const server = express();

// conf
const port = process.env.PORT || 3000;
const distDir = 'dist/';

const appFolder = path.join(__dirname, distDir);

// route static files
server.use('/static', express.static(appFolder + '/static'));

// catch-all route to index.html
server.get('/*', (req, res) => {
  res.sendFile(appFolder + '/index.html');
});

server.listen(port, () => {
  console.log('server listening on port ' + port);
});
