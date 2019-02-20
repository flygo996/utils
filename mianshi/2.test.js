/*
 * @Author: laifeipeng 
 * @Date: 2019-02-20 17:36:01 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-20 19:42:46
 */

 // 彩色打印
const padZero = n => n < 10 ? ` ${n}` : `${n}`; //因为生成的数组不超过100，最多2位数
const arrStr = arr => arr.length && arr.reduce((acc, item) => acc + '    ' + padZero(item))
const logTitle = str => console.log(`%c -------------- ${str} -------------- `, 'color:green');
const logArr = arr => console.log(`%c 初始数组 ： ${arrStr(arr)} `, 'color:blue');
const logArr2 = arr => console.log(`%c 排序后数组: ${arrStr(arr)} `, 'color:red');


// 给一个数组（其元素不重复），求所有元素相加为某个值的2个元素对的下标对
// eg: [2, 9, 3, 10, 8, 1, 22] 目标值11，有[[0, 1], [2, 4], [3, 5]]
function g(arr, target) {
  // logArr(arr)
  console.log('初始数组：',arrStr(arr))
  const a = arr.slice().sort((a, b) => a - b);
  console.log('升序数组：',arrStr(a))
  // logArr2(a)
  const len = a.length;
  const key = [];//存放最后的元素组
  const val = [];//存放最后的下标组
  if (len <= 1) return []
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