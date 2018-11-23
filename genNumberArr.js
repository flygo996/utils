/*
* desc: 数值数组相关
* auth：laifeipeng
* date: 2018.11.23
*/

/* 
 * desc: 生成固定数值的数组
 * {Number} length:数组的长度
 * {Number} value:数组的填充值
 */
const genFixedNumberArr = (length, value) => Array.from({ length }, () => value)
const genFixedNumberArr2 = (length, value) => Array(length).fill(value)
console.log(genFixedNumberArr(5, 6))// =>[ 6, 6, 6, 6, 6 ]
console.log(genFixedNumberArr2(5, 6))// =>[ 6, 6, 6, 6, 6 ]

/* 
 * desc: 生成1-N的数值数组
 * {Number} length:数组的长度
 */
const genOneToNArr = (length) => Array.from({ length }, (o, i) => i + 1)
const genOneToNArr2 = (length) => [...Array(length).keys()].map(i => i + 1)
console.log(genOneToNArr(5))// =>[ 1, 2, 3, 4, 5 ]
console.log(genOneToNArr2(5))// =>[ 1, 2, 3, 4, 5 ]
