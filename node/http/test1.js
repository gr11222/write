const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
	if (req.url === '/favicon.ico') {
	    return
	}
	// console.log(url.parse(req.url));
	http.request('http://localhost:9999/',function(data){
		console.log(data)
	})
	res.write('4514665');
	res.end();
}).listen(1)

process.on('exit',(code)=>{
	console.log(code)
})

const server2 = http.createServer((req,res)=>{
	if (req.url === '/favicon.ico') {
	    return
	}
	// console.log(url.parse(req.url));
	res.write('55555');
	res.end();
}).listen(9999)