/*
 * @Author: laifeipeng 
 * @Date: 2019-02-22 09:17:02 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 16:03:34
 */
// 主要是写关于es6使用let还是const得技巧

// 1、基本数据类型
const PI = 3.14159265;
let sum = 0; sum += 10;

// 2、引用数据类型
const obj = {}; obj.name = "laifeipeng";
const arr = []; arr.push({ name: "laifeipeng" });
// 上面，虽然obj和arr的值会变化，但是它们指向的内存地址不变。
const http = require('http');
const add = function (a, b) { return a + b };
const sub = (a, b) => a - b;

// 3、for 循环
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 如果把let改为const会报错：Uncaught TypeError: Assignment to constant variable.

// 4、for...in, for...of
const a = [10, 20, 30];
for (const i in a) {
  console.log(i);
}
for (const i of a) {
  console.log(i);
}