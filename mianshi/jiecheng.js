/*
 * @Author: laifeipeng 
 * @Date: 2019-02-25 15:39:49 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-25 17:09:34
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
// console.log(factorial(5));//120

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

// 上面是用数组来缓存，下面使用map来缓存
const map = {
  0: 1,
  1: 1,
}
const factorial2 = function f(num) {
  if (num < 0) {
    return -1;
  }
  const len = Object.keys(map).length;
  if (num <= len - 1) {
    return map[num];
  } else {
    let rst = map[len - 1];
    for (let n = len; n <= num; n++) {
      rst *= n;
      map[n] = rst;
    }
    return rst;
  }
};
console.log(factorial2(4));   // 24
console.log(map);             // { '0': 1, '1': 1, '2': 2, '3': 6, '4': 24 }
console.log(factorial2(5));   // 120
console.log(map);             // { '0': 1, '1': 1, '2': 2, '3': 6, '4': 24, '5': 120 }