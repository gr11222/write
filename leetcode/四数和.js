/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
	let sum = []
	if (nums.length < 4)
		return sum
	nums.sort((a, b) => a - b);
	let length = nums.length;
	for (var i = 0; i < length - 3; i++) {
		if (nums[i] == nums[i - 1])
			continue
		let t1 = target - nums[i];
		if (nums[i + 1] + nums[i + 2] + nums[i + 3] > t1)
			break;
		if (nums[length - 1] + nums[length - 2] + nums[length - 3] < t1)
			continue;
		for (var j = i + 1; j < length - 2; j++) {
			if (j > i + 1 && nums[j] == nums[j - 1])
				continue
			let t2 = t1 - nums[j];
			if (nums[j + 1] + nums[j + 2] > t2)
				continue;
			if (nums[length - 1] + nums[length - 2] < t2)
				continue;
			let left = j + 1;
			let right = length - 1;
			while (left < right) {
				if (nums[left] + nums[right] === t2) {
					sum.push([nums[i], nums[j], nums[left], nums[right]])
					while (nums[left] === nums[left + 1])
						left++
						while (nums[right] === nums[right - 1])
							right--
							left++;
					right--;
				} else if (nums[left] + nums[right] > t2) {
					right--
				} else {
					left++
				}
			}
		}
	}
	return sum
};