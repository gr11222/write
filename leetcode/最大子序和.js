/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
	let pre=0,max=nums[0];
	for (let item of nums) {
		pre = Math.max(pre+item,item)
		max = Math.max(max,pre)
	}
	return max
};