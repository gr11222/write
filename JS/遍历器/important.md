forEach函数会产生闭包作用域
如
	[1,2,3].forEach(item=>{
		setTimeout(()=>{console.log(item)})
	})//1 2 3