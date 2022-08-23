function myNew (fn, ...args) {
  // const obj={}
  // obj.__proto__=fn.prototype // 也可以写成 Object.setPrototypeOf(obj,fn.prototype)
  // 上面2行可以通过下面一行代替
  const obj = Object.create(fn.prototype)
  const rst = fn.apply(obj, args)
  return rst instanceof Object ? rst : obj
}
// L:fnc, R:ctr
function myInstanceof (L, R) {
  const O = R.prototype
  while (true) {
    if (L === null) {
      return false
    }
    if (L === O) {
      return true
    }
    L = L.__proto__ // 也可以写成 L = Object.getPrototypeOf(L)
  }
}
function myCreate (proto) {
  const obj = {}
  Object.setPrototypeOf(obj, proto)
  return obj
}

Function.prototype.myApply = function (context, args) {
  const ctx = context || window
  const fn = Symbol()
  ctx[fn] = this
  const rst = ctx[fn](...args)
  delete ctx[fn]
  return rst
}

// 第三版  https://juejin.im/post/6844904094763581447
Function.prototype.myBind = function (asThis, ...args1) {
  const fn = this
  const resultFn = function (...args2) {
    return fn.call(this instanceof resultFn ? this : asThis, ...args1, ...args2)
  }
  const fnNo = new Function()
  fnNo.prototype = fn.prototype
  resultFn.prototype = new fnNo() // 使用fnNo做中转 resultFn.prototype.__proto__ === fnNo.prototype === fn.prototype;
  return resultFn
}
