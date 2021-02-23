输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
	let sum = [];
	function deep(arr,nums){
		if(arr.length===nums.length){
			sum.push([...arr])
			return
		}
		for (var i = 0; i < nums.length; i++) {
			if(arr.includes(nums[i]))
				continue
			arr.push(nums[i])
			deep(arr,nums)
			arr.pop()
		}
	}
	deep([],nums);
	return sum;
};

