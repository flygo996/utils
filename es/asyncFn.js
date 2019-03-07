/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 09:34:07 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 09:36:01
 */

//  输出顺序
new Promise(resolve => {
  console.log(1);
  resolve(2);
  Promise.resolve().then(() => console.log(3));
}).then(num => {
  console.log(num);
})
console.log(4);

// 打印出：1--4--3--2