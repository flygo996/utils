/*
题目二：
 编写一个递归函数检测数组的深度

 假设 非数组返回-1，平铺数组返回0
*/
function getArrDepth (arr) {
  if (!Array.isArray(arr)) {
    return -1
  }
  // flatten的次数就是数组深度
  function getDepth (arr, times) {
    arr = arr.filter(e => Array.isArray(e))
    if (!arr.length) {
      return times
    }
    times++
    const flatten = arr =>
      arr.reduce((item, next) =>
        item.concat(Array.isArray(arr) ? flatten(next) : next, [])
      )
    arr = flatten(arr)
    return getDepth(arr, times)
  }
  return getDepth(arr, 0)
}

console.log(getArrDepth([])) // 0
console.log(getArrDepth([1, 2, 3])) // 0
console.log(getArrDepth([[1, 2, 3, [4, 5, 6]], 2, 3])) // 2
