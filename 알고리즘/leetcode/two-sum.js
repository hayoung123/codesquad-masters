// const twoSum = (nums, target) => {
//   for (let i = 0; i < nums.length; i++) {
//     let tmpArr = nums.slice(i + 1);
//     let tmpNum = target - nums[i];
//     if (tmpArr.includes(tmpNum)) {
//       return [i, tmpArr.indexOf(tmpNum) + i + 1];
//     }
//   }
// };

const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
};
