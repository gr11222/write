/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
	let sum = [];

	function deep(arr, nums) {
		if (arr.length === nums.length) {
			arr = arr.map((item) => {
				return nums[item]
			})
			sum.push([...arr])
			return
		}
		const map = new Map();
		for (var i = 0; i < nums.length; i++) {
			if (arr.includes(i)||map.get(nums[i]))//同级循环时遇到相同元素跳过
				continue
				map.set(nums[i], true);
				arr.push(i)
				deep(arr, nums)
				arr.pop()

		}
	}
	deep([], nums);
	return sum;
};