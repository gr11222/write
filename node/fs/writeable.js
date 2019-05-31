let fs = require('fs');
(async function(){
	await new Promise(res=>{
		fs.mkdir('nihao',()=>

			res()
		)
	})
	await new Promise(res=>{
		setTimeout(()=>{
			res()
		},5000)
	})
	await new Promise(res=>{
		var ss = fs.createReadStream('IMG_20181112_105809.jpg')
		var dd = fs.createWriteStream('nihao/'+ss.path)
		ss.pipe(dd);
	})
	const rs = fs.createWriteStream('nihao/1.txt')
	rs.write('49845')
	rs.end()
})()

