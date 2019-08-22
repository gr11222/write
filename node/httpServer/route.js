const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const jade = require('jade');
const config = require('./config');
const mime = require('./mime');
const zlib = require('zlib');

module.exports = async function (req, res, filepath) {
    try {
        let stat = await promisify(fs.stat)(filepath);
        if (stat.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', mime(filepath));
            res.setHeader('Content-Encoding', 'gzip');
            fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res)
        } else if (stat.isDirectory()) {
            const files = await promisify(fs.readdir)(filepath);
            console.log(path.relative(config.path, filepath));
            res.statusCode = 200;   
            res.setHeader('content-type', 'text/html');
            var data = fs.readFileSync("./view/index.jade", 'utf-8');
            var fn = jade.compile(data);
            var resolvePath = path.relative(config.path, filepath) ? "/" + path.relative(config.path, filepath) : '';
            var html = fn({ files, title: resolvePath });
            res.end(html);
        }

    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        res.setHeader('content-type', 'text/html');
        res.end(`${filepath} is not a directory or file\n ${e}`);
    }
}