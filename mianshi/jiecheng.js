/*
 * @Author: laifeipeng 
 * @Date: 2019-02-25 15:39:49 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-25 16:37:22
 */
// // 未使用缓存
// const factorial = function f(num) {
//   if (num < 0) {
//     return -1;
//   } else if (num === 0 || num === 1) {
//     return 1;
//   } else {
//     return (num * f(num - 1));
//   }
// };
// console.log(factorial(5))//120

const mapArr = [1, 1];

const factorial = function f(num) {
  if (num < 0) {
    return -1;
  }
  if (num <= mapArr.length - 1) {
    return mapArr[num];
  } else {
    let rst = mapArr[mapArr.length - 1];
    for (let n = mapArr.length; n <= num; n++) {
      rst *= n;
      mapArr[n] = rst;
    }
    return rst;
  }
};
console.log(factorial(4));  // 24
console.log(mapArr);        // [ 1, 1, 2, 6, 24 ]
console.log(factorial(5));  // 120
console.log(mapArr);        // [ 1, 1, 2, 6, 24, 120 ]