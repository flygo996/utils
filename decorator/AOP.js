/*
 * @Author: laifeipeng 
 * @Date: 2019-03-19 11:27:22 
 * @Last Modified by:   laifeipeng 
 * @Last Modified time: 2019-03-19 11:27:22 
 */

// 前置代码
Function.prototype.before = function(fn) {
  const self = this
  return function() {
    fn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

// 后置代码
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    self.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

const wear1 = function() {
  console.log('穿上第一件衣服')
}

const wear2 = function() {
  console.log('穿上第二件衣服')
}

const wear3 = function() {
  console.log('穿上第三件衣服')
}

const wear = wear1.after(wear2).after(wear3)
wear()

// 穿上第一件衣服
// 穿上第二件衣服
// 穿上第三件衣服