const fs = require('fs')
var rs = fs.createReadStream('IMG_20181112_105809.jpg');
var re = rs.on('data',(data)=>{
	console.log(data)
	console.log("-------------------------------")
})
rs.on('end',(data)=>{
	console.log("-------------------------------")
	console.log(re)
})