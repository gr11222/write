function debounce(fn,wait,immediate){
	let timer = null;
	return function (argument) {
		let context = this,
			args = arguments;
		if(timer){
			clearTimeout(timer)
		}
		if(immediate){
			let callnow = !timer;
			timer = setTimeout(function(){
				timer = null;
			}, wait)
			if(callnow) fn.apply(context,args)
		}else{
			timer = setTimeout(function(){
				fn.apply(context,args)
			}, wait)
		}
	}
}