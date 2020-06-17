// async function asyncfn(){
// 	let a = 10;
// 	await time();
// 	await time2();
// 	// console.log(a)
// }

// function time(){
// 		setTimeout(()=>{
// 			return new Promise((res,rej)=>{
// 	})
// 			console.log('time')
// 		},1000)
	
// }

// function time2(){
// 		setTimeout(()=>{
// 			return new Promise((res,rej)=>{
// 	})
// 			console.log('time2')
// 		},1000)
	
// }
// asyncfn()

function sync(a){
	return new Promise((res)=>{
		setTimeout(()=>{
			res(a)
		},1000)
	})
}

async function run(){
	var b =  await sync(1);
	console.log(b)
	var c =  await sync(2);
	console.log(c)
}
run()