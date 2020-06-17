var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer(function(request, response) {
	// 解析请求，包括文件名
	var pathname = url.parse(request.url).pathname;
	if(pathname.substr(1)=="farvirate.ico"){
		return;
	}
	// 输出请求的文件名
	response.writeHead(200, {
		"Content-Type": "text/html; charset=UTF-8",
		"Access-Control-Allow-Origin": 'http://localhost',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
	});
	response.write("dsa");
	response.end();
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');