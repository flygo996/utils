/*
 * @Author: laifeipeng 
 * @Date: 2019-03-19 19:28:54 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-19 19:59:02
 */

// 有一个长度为 100 的数组，请求出该数组的前 10 个元素之和。
const sum = (arr) => arr.slice(0, 10).reduce((acc, item) => acc + item)

// 测试
const arrGen = (length) => Array.from({ length }, () => ~~(Math.random() * 100))
const arrGen2 = (length) => Array.from({ length }, (o, i) => i + 1)
// console.log(arrGen(100))
// console.log(sum(arrGen(100)))

// 测试成功！

/********************************* 分割线 ************************************/

// 写一个程序打印 1 到 100 这些数字，遇到数字为 3 的倍数，打印 “A” 替代该数字；
// 遇到 5 的倍数，用 “B” 代替；遇到即是 3 的倍数又是 5 的倍数，打印 “AB”。
const genSpecialArr = (length) => {
  return Array.from({ length }, (obj, i) => {
    const o = i + 1
    if (o % (3 * 5) === 0) {
      return 'AB'
    } else if (o % 3 === 0) {
      return 'A'
    } else if (o % 5 === 0) {
      return 'B'
    } else {
      return o
    }
  })
}
// console.log(genSpecialArr(100))

// 测试成功！


// js继承
function extend(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  //用新创建的对象替代子类默认原型，设置Rect.prototype.constructor = Rect;保证一致性
  Child.prototype.constructor = Child;  
}

