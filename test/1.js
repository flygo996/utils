/*
 * @Author: laifeipeng 
 * @Date: 2019-03-18 16:59:54 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-18 22:53:34
 */
const arr = [{ a: 10 }, { a: 20 }]
// 求a的和

// 方法一
function sum1(arr, key) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][key]
  }
  return sum
}

// 方法二
function sum2(arr, key) {
  return arr.reduce((acc, item) => acc + item[key], 0)
}


console.log(sum1(arr, 'a'))//30
console.log(`-------`)
console.log(sum2(arr, 'a'))//30