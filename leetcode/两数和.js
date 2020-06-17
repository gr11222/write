/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = {};//key数字 value下标
    let loop = 0;//循环次数
    let dis;//目标与当前值的差
    while(loop < nums.length){
        dis = target - nums[loop];
        if(map[dis] != undefined){
            return [map[dis], loop];
        }
        map[nums[loop]] = loop;
        loop++;
    }
    return;
};

var twoSum = function(nums, target) {
    let map = {}
    let dis;
    for (var i = 0; i < nums.length; i++) {
        dis = target - nums[i];
        if(map[dis]!=undefined)
            return [map[dis],i]
        map[nums[i]] = i
    }
    return
};

var twoSum = function(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        if(nums.indexOf(target-nums[i])!=-1 && nums.indexOf(target-nums[i])!=i){
            return [nums.indexOf(target-nums[i]),i]
        }
    }
    return
};