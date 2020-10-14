/* 题目一：
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:

输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
示例 2:

输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
*/

// 二分搜索
function findTarget (arr, target) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    const mid = ~~((low + high) / 2)
    if (arr[mid] === target) {
      return mid
    }
    // 左半部分有序
    if (arr[mid] >= arr[low]) {
      if (target > arr[mid]) {
        low = mid + 1
      } else {
        if (target === arr[low]) {
          return low
        }
        if (target > arr[low]) {
          high = mid - 1
        } else {
          low = mid + 1
        }
      }
    }
    // 右半部分有序
    else {
      if (target < arr[mid]) {
        high = mid - 1
      } else {
        if (target === arr[high]) {
          return high
        }
        if (target < arr[high]) {
          low = mid + 1
        } else {
          high = mid - 1
        }
      }
    }
  }
  return -1
}
console.log(findTarget([4, 5, 6, 7, 0, 1, 2], 0)) // 4
console.log(findTarget([4, 5, 6, 7, 0, 1, 2], 3)) // -1
