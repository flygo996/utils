// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134
// 第一步，先实现加和运算
var add = function (a, b) {
  return a + b;
};

var currying = function (fn, defineVal = 0) {
  return function (...args) {
    // 第一次调用的是这个函数
    // 每次执行前先进行和的初始化
    var sum = defineVal;

    function func(...argts) {
      // 第二次之后调用的是这个函数
      if (args.length === 0) {
        return func.toString();
      } else {
        argts.unshift(sum);
        sum = argts.reduce(fn);
        return func;
      }
    }
    func.toString = () => sum;
    return func(...args);
  };
};

var add = currying(add);
console.info(add(1)); // => 1
console.info(add(1)(2)); // => 3
console.info(add(1)(2)(3)); // => 6
console.info(add(1, 2)(3)); // => 6
console.info(add(1)(2, 3)); // => 6
console.info(add(1, 2, 3)); // => 6
console.info(add(1, 2, 3)(4)); // => 10
