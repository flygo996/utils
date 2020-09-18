/*
 * @Author: laifeipeng
 * @Date: 2019-02-20 17:36:01
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2020-09-18 10:17:59
 */
// 给一个数组（其元素不重复），求所有元素相加为某个值的2个元素对的下标对
// eg: [2, 9, 3, 10, 8, 1, 22] 目标值11，有[[0, 1], [2, 4], [3, 5]]

// 本人的实现不仅找出下标组，把对应的元素组也一起返回了，提高函数功能，谁知道后面会不会更改需求呢
// 如果数组原本就有序，可以用这个方法，如果无序，优先使用法二法三
function findNum (arr, target) {
  const a = arr.slice().sort((a, b) => a - b)
  const len = a.length
  const key = [] //存放最后的元素组
  const val = [] //存放最后的下标组
  if (len <= 1) return
  let i = 0
  let j = len - 1
  while (i < j) {
    if (a[i] + a[j] < target) {
      i++
    } else if (a[i] + a[j] > target) {
      j--
    } else {
      val.push([a[i], a[j]])
      key.push([i, j])
      i++
      j--
    }
  }
  // 如果只要下标组，则：return key;
  return {
    key,
    val
  }
}

// 上面的算法实现需要排序数组，下面介绍一个不用排序的算法
function findNum2 (arr, target) {
  const len = arr.length
  const key = [] //存放最后的元素组
  const val = [] //存放最后的下标组
  if (len <= 1) return
  // 注意不是i>=0
  for (let i = len - 1; i > 0; i--) {
    const diff = target - arr[i]
    // 从i+1开始查询是否存在diff的值（下标）
    const index = arr.slice(0, i).indexOf(diff)
    if (index !== -1) {
      key.push([i, index])
      val.push([arr[i], arr[index]])
    }
  }
  // 如果只要下标组，则：return key;
  return {
    key,
    val
  }
}

// 法三
// 使用map存数据，然后去里面查


// 下面是测试
const arr = [2, 9, 3, 10, 8, 1, 22]
const target = 11
console.log(findNum(arr, target))
console.log(findNum2(arr, target))
// { key: [ [ 0, 5 ], [ 1, 4 ], [ 2, 3 ] ],
//   val: [ [ 1, 10 ], [ 2, 9 ], [ 3, 8 ] ] }

