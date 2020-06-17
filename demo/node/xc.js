var fs = require('fs');

async function readFile() {
	var data = await new Promise((res, rej) => {
		fs.readFile('async.js', (err, data1) => {
			res(data1.toString())
		})
	});
	console.log(data)
}
readFile()
console.log("")