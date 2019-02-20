/*
 * @Author: laifeipeng 
 * @Date: 2019-02-20 17:36:01 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-20 19:37:38
 */
// 给一个数组（其元素不重复），求所有元素相加为某个值的2个元素对的下标对
// eg: [2, 9, 3, 10, 8, 1, 22] 目标值11，有[[0, 1], [2, 4], [3, 5]]
function g(arr, target) {
  const a = arr.slice().sort((a, b) => a - b);
  const len = a.length;
  const key = [];//存放最后的元素组
  const val = [];//存放最后的下标组
  if (len <= 1) return;
  let i = 0;
  let j = len - 1;
  while (i < j) {    
    if (a[i] + a[j] < target) {
      i++
    } else if (a[i] + a[j] > target) {
      j--
    } else {
      val.push([a[i], a[j]])
      key.push([i, j])
      i++; j--;
    }
  }
  return {
    key, val
  }
}
const arr = [2, 9, 3, 10, 8, 1, 22];
const target = 11;
console.log(g(arr, target))