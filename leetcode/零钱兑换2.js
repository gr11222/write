/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
	let arr = new Array(amount+1).fill(0);
	arr[0] = 1;
	for(let coin of coins){
		for (var i = coin; i < arr.length; i++) {
			if(i-coin>=0)
				arr[i] = arr[i] + arr[i-coin]
		}
	}
	return arr[amount]
};
change(5,[1,2,5])