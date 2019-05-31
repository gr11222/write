const fs = require('fs')

// fs.readdir(__dirname,function(files){
// 	console.log(files)
// })
fs.rmdir('484',function(err){
	console.log(err)
})
console.log(require('path').resolve('./','home'))