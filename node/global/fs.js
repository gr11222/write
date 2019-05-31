const fs = require('fs')

// fs.writeFile('1.txt',"hello world!",(err,data)=>{
// 	if(err){
// 		console.log(err)
// 	}
// })

var rs = fs.createReadStream('argv.js','utf-8');
var rf = fs.createWriteStream('1.txt');
rs.pipe(rf)

process.on('exit',function(code){
	console.log(code)
})