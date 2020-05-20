const querystring = require('querystring');
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const postData = querystring.stringify({
    'msg': ''
});

const options = {
    hostname: 'www.xbiquge.la',
    port: 80,
    path: '/paihangbang/',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    var str = '';
    var rw = fs.createWriteStream("./test.html");
    var rs = fs.createReadStream("./test.html");


    res.on('data', (chunk) => {
        console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据');
        rs.end();
    });
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入请求主体。
// req.write(postData);
