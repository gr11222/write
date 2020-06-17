convert = function(s, numRows) {
	if (numRows !== 1) {
		let arr = new Array(numRows).fill("");
		let n = numRows * 2 - 2;
		for (let i = 0; i < s.length; i++) {
			let x = i % n;
			arr[x < numRows ? x : n - x] += s[i];
		}
		return arr.join("");
	} else {
		return s;
	}
};