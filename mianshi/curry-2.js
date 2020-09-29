// https://www.jianshu.com/p/2975c25e4d71
// 普通的add函数
function add (x, y) {
  return x + y
}

// Currying后
function curryingAdd (x) {
  return function (y) {
    return add.apply(this, [x, y])
  }
}

console.log(add(1, 2)) // 3
console.log(curryingAdd(1)(2)) // 3

// 仅支持2次调用
function curry (fn) {
  return function (...arg1) {
    return function (...arg2) {
      return fn.apply(this, [...arg1, ...arg2])
    }
  }
}
var sum = curry(add)
console.log(sum(1)(2)) // 3

// 支持多次调用
function curry (fn) {
  const args = []
  return function (...arg1) {
    return function (...arg2) {
      args.push(...arg1, ...arg2)
      if (args.length === fn.length) {
        return fn.apply(this, args)
      }
      return curry.apply(this,)
    }
  }
}
var sum = curry(add)
console.log(sum(1)(2)) // 3
