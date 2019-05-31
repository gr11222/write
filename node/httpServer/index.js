const path = require('path');
const http = require('http');
const config = require('./config');
const route = require('./route');

http.createServer((req, res) => {
    if (req.url.indexOf('favicon.ico') != -1) {
        return;
    }
    let filePath = path.join(config.path, req.url);
    route(req, res, filePath);
}).listen(config.port, config.host)