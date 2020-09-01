const getCtx = context => {
  const type = typeof context
  if (context === undefined || context === null) {
    type = 'window'
  }
  switch (type) {
    case 'window':
      context = window
      break
    case 'number':
      context = Number(context)
      break
    case 'string':
      context = String(context)
      break
    case 'boolean':
      context = Boolean(context)
      break
    default:
      context = context
  }
}

// https://juejin.im/post/6844903891092389901#heading-10

Function.prototype.myApply = function (context, args) {
  //这里默认不传就是给window,也可以用es6给参数设置默认参数
  context = context || window
  args = args ? args : []
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  context[key] = this
  //通过隐式绑定的方式调用函数
  const result = context[key](...args)
  //删除添加的属性
  delete context[key]
  //返回函数调用的返回值
  return result
}

//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (context, ...args) {
  //这里默认不传就是给window,也可以用es6给参数设置默认参数
  context = context || window
  args = args ? args : []
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  context[key] = this
  //通过隐式绑定的方式调用函数
  const result = context[key](...args)
  //删除添加的属性
  delete context[key]
  //返回函数调用的返回值
  return result
}

Function.prototype.myBind = function (context, ...args) {
  const fn = this
  args = args ? args : []
  return function newFn (...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args, ...newFnArgs])
  }
}
