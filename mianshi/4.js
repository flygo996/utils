/*
 * @Author: laifeipeng 
 * @Date: 2019-03-21 17:54:13 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-21 17:55:28
 */
// 数组里面找到两个值相加与目标值K最接近
// 数组里面的元素都是数值，且有重复，有正数负数
const findMin = (arr, K) => {
  let idx1 = 0;
  let idx2 = 0;
  const a = [...new Set(arr)].sort((a, b) => a - b);
  const len = a.length;
  let min = a[len - 1] - a[0];
  for (let i = 0; i < len; i++) {
    const temp = K - a[i];
    let j = len - 1;
    while (j > i) {
      const diff = Math.abs(a[j] - temp);
      if (diff < min) {
        min = diff;
        idx1 = i;
        idx2 = j;
      }
      j--;
    }
  }
  return [idx1, idx2];
}
