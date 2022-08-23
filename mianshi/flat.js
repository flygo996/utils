/*
 * @Author: laifeipeng 
 * @Date: 2019-02-22 14:39:44 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2022-08-23 08:32:15
 */
// 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
function f(arr) {
  return [...new Set(String(arr).split(','))].sort((a, b) => a - b).map(Number);
}

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
console.log(deepFlatten([1, [2, 3, [4, 5]]])) // [ 1, 2, 3, 4, 5 ]