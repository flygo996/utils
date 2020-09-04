// 存值 或者 存下标
const twoSum = function (nums, target) {
  const map = {}
  for (let i = nums.length - 1; i >= 0; i--) {
    if (map[nums[i]] !== undefined) {
      // return [nums[i], map[nums[i]]] // 存值
      return [i, map[nums[i]]] // 存下标
    } else {
      // map[target - nums[i]] = nums[i] // 存值
      map[target - nums[i]] = i // 存下标
    }
  }
}
console.log(twoSum([1, 2, 2, 3], 4)) // [ 1, 2 ]

const allTwoSum0 = function (nums, target) {
  const res = []
  for (let i = nums.length - 1; i >= 0; i--) {
    const diff = target - nums[i]
    const idx = nums.slice(0, i).findIndex(o => o === diff)
    if (idx > -1) {
      res.push([i, idx])
    }
  }
  return res
}
console.log(allTwoSum0([1, 2, 2, 3], 4)) // [ [ 3, 0 ], [ 2, 1 ] ]

const allTwoSum = function (nums, target) {
  const res = []
  const map = {}
  for (let i = nums.length - 1; i >= 0; i--) {
    if (map[nums[i]] !== undefined) {
      res.push([i, map[nums[i]]]) // 存下标
    } else {
      map[target - nums[i]] = i // 存下标
    }
  }
  return res
}
console.log(allTwoSum([1, 2, 2, 3], 4)) // [ [ 3, 0 ], [ 2, 1 ] ]

const allThreeSum = function (nums, target) {
  const res = []
  for (let i = nums.length - 1; i >= 0; i--) {
    const diff = target - nums[i]
    const twoSumResult = allTwoSum(nums.slice(0, i), diff)
    if (twoSumResult.length) {
      twoSumResult.forEach(arr => res.push([i, ...arr]))
    }
  }
  return res
}
console.log(allThreeSum([1, 2, 2, 3], 6)) // [ [ 3, 0, 1 ] ]
