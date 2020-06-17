/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
	let arr = new Array(amount+1).fill(Infinity);
	arr[0] = 0;
	for (var i = 0; i < arr.length; i++) {
		for(let coin of coins){
			if(i-coin>=0){
				arr[i] = Math.min(arr[i],arr[i-coin]+1)
			}
		}
	}
	return arr[amount]===Infinity?-1:arr[amount]
};