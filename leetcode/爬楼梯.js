/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
	// 数组交换 f(n) = f(n-1)+f(n-2);斐波那契
	let r = 1,
		p = 0,
		q = 0;
	for (var i = 0; i < n; i++) {
		p = q;
		q = r;
		r = p+q;
	}
	return r
};