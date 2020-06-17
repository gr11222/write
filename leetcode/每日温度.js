/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    const len = T.length;
    const stack = [];
    const res = (new Array(len)).fill(0);
    for (let i=0; i < len;i++) {
        while(stack.length && T[i] > T[stack[stack.length - 1]]) {
            const top = stack.pop();
            res[top] = i - top;
        }
        stack.push(i)
    }
    return res
};

/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
	let arr = []
	for (var i = 0; i < T.length; i++) {
		for (var j = i + 1; j < T.length; j++) {
			if (T[i] < T[j]) {
				arr.push(j - i)
				break
			}
			if (j === T.length - 1)
				arr.push(0)
		}
	}
	arr.push(0)
	return arr
};