function fn (n) {
	const arr = [];
	for(var i=0;i<n;i++){
		if(i<2){
			arr[i] = 1;
		}else{
			arr[i] = arr[i-2] + arr[i-1];
		}
		console.log(arr[i])
	}
}
fn(10)