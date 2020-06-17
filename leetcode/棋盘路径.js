function fn(m,n){
	var arr = new Array(m).fill(new Array(n).fill(1));
	for (var i = 1; i < m; i++) {
		for (var j = 1; j < n; j++) {
			arr[i][j] = arr[i-1][j]+arr[i][j-1]
		}
	}
	return arr[m-1][n-1];
}
console.log(fn(7,3))