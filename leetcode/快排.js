function fn(arr) {
	if(arr.length<=1){
		return arr;
	}
	let left = [];
	let right = [];
	let point = arr.splice(0,1)[0];
	for (var i = 0; i < arr.length; i++) {
		arr[i]>point?right.push(arr[i]):left.push(arr[i])
	}
	return fn(left).concat(point,fn(right))
}

var arr = fn([1,2,9,3,4,5])
console.log(arr)