function Parents(){
	this.init()
}
Parents.prototype.init = function(argument){
	console.log('Parents init')
};

function Children(){
	Parents.call(this)
}
//--------------------------------------------------------1
// +function(){
// 	var item = function(){}
// 	item.prototype = Parents.prototype;
// 	Children.prototype = new item()
// }()

// Children.prototype.constructor = Children;
//--------------------------------------------------------2
Children.prototype = Object.create(Parents.prototype, {
	constructor:{
		value:Children,
		enumerable:false,
		writable: true,
    	configurable: true
	}
})