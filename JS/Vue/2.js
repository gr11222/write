let fs = require('fs')
fs.readFile("axios.md", () => {
	console.log(2222222222)
	setImmediate(() => {
		console.log('timeout1')
		Promise.resolve().then(() => console.log('promise resolve'))
		process.nextTick(() => console.log('next tick1'))
	});
	setImmediate(() => {
		console.log('timeout2')
		process.nextTick(() => console.log('next tick2'))
	});
	setImmediate(() => console.log('timeout3'));
	setTimeout(() => console.log('timeout4'));
})