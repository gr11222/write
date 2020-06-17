var a = [{id:1},{id:2}]
var b = [{id:1}]
a.filter((item)=>{
	!b.some((item2)=>{
		item.id==item2
	})
})