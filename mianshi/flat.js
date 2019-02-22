/*
 * @Author: laifeipeng 
 * @Date: 2019-02-22 14:39:44 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-22 14:46:09
 */
// 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
function f(arr) {
  return [...new Set(String(arr).split(','))].sort((a, b) => a - b).map(Number);
}

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));