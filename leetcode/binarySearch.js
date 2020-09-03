// 8、二分查找(原数组必须升序，否则不行)
// 下面的实现是针对升序数组的
// 非递归实现
function binary_search(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = ~~((high + low) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      low = mid + 1;
    } else if (target < arr[mid]) {
      high = mid - 1;
    }
  }
  return -1;
}
// 递归实现
function binary_search2(arr, target) {
  function search(arr, low, high, target) {
    if (low > high) return -1;
    const mid = ~~((low + high) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      return search(arr, mid + 1, high, target);
    } else if (target < arr[mid]) {
      return search(arr, low, mid - 1, target);
    }
  }
  return search(arr, 0, arr.length - 1, target)
}