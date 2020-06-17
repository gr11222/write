var threeSum = function(nums) {
	let re = [];
	let left;
	let right;
	nums.sort((a, b) => a - b);
	if (nums[0] > 0) {
		return re
	}
	for (var i = 0; i < nums.length; i++) {
		if (i > 0 && nums[i] == nums[i - 1])
			continue
		let target = -nums[i];
		left = i + 1;
		right = nums.length - 1;
		while (left < right) {
			if (nums[left] + nums[right] === target) {
				re.push([nums[i], nums[left], nums[right]])

				while (left < right && nums[left] == nums[left + 1]) {
					left++
				}
				while (left < right && nums[right] == nums[right - 1]) {
					right--
				}
				left++
				right--
			} else if (nums[left] + nums[right] > target) {
				right--
			} else {
				left++
			}
		}
	}
	return re
};
var threeSum = function(nums) {
		let re = [];
		nums.sort((a, b) => a - b)
		for (var i = 0; i < nums.length; i++) {
			if (i > 0 && nums[i] === nums[i - 1])
				continue;
			let target = 0 - nums[i];
			for (var j = i + 1; j < nums.length; j++) {
				if (j - 1 !== i && nums[j] === nums[j - 1])
					continue;
				let target2 = target - nums[j]
				for (var k = j + 1; k < nums.length; k++) {
					if (k - 1 !== j && nums[k] === nums[k - 1])
						continue;
					if (target2 === nums[k]) {
						re.push([nums[i], nums[j], nums[k]])
					}
				}
			}
		}