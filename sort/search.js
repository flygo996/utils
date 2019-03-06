/*
 * @Author: laifeipeng 
 * @Date: 2019-03-06 18:13:30 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-06 18:25:19
 */
// 二分查找

// 1、非递归实现
function binary_search(arr, key) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = parseInt((high + low) / 2);
    if (key == arr[mid]) {
      return mid;
    } else if (key > arr[mid]) {
      low = mid + 1;
    } else if (key < arr[mid]) {
      high = mid - 1;
    }
  }
  return -1;
};

// 2、递归实现
function binary_search2(arr, key) {
  function search(arr, low, high, key) {
    if (low > high)
      return -1;
    const mid = parseInt((low + high) / 2);
    if (key == arr[mid])
      return mid;
    else if (key > arr[mid])
      return search(arr, mid + 1, high, key);
    else if (key < arr[mid])
      return search(arr, low, mid - 1, key);
  }
  return search(arr, 0, arr.length - 1, key);
}

// 测试
const genArr = length => Array.from({ length }, (...arg) => arg[1] + 1);
const arr = genArr(10);
console.log(arr); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(binary_search(arr, 2)); // 1
console.log(binary_search2(arr, 2));// 1
// 成功！~~