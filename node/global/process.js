// const {beforeExit,exit} = process;
// process.on('beforeExit',(code)=>{
// 	console.log('beforeExit')
// 	console.log(code)
// })
// throw new Error("quit")
// process.on('exit', (code) => {
//   console.log(`退出码: ${code}`);
// });
// console.log('22222')

function timer(i){
	return new Promise(res=>{
		setTimeout(()=>{console.log(new Date().getTime());res(i)},1000)
	})
}
async function run(){
	for (let i = 0; i < 10; i++) {
		var res = await timer(i)
		console.log(res)
	}
}
console.log(global)
run()
process.on('exit', (code) => {
  console.log(`退出码: ${code}`);
});