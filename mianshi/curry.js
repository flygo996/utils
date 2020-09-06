// es6
function currying (callback, ...initialParam) {
  return (...param) => {
    return (params => {
      return params.length === callback.length
        ? callback(...params)
        : currying(callback, ...params)
    })([...initialParam, ...param])
  }
}

// https://juejin.im/post/6844904000509181965
const curry = (f, arr = []) => (...args) =>
  (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

let currying = (fn, len, ...args) =>
  args.length === len
    ? fn(...args)
    : currying.bind(null, fn, args.length, ...args)

var currying = function (fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(null, newArgs)
  }
}

var curry = function (fn) {
  var _args = []
  return function cb () {
    if (arguments.length == 0) {
      return fn.apply(this, _args)
    }
    Array.prototype.push.apply(_args, arguments)
    return cb
  }
}
