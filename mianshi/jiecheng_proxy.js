/*
 * @Author: laifeipeng 
 * @Date: 2019-02-25 17:08:21 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-25 17:20:11
 */

// 阶乘
const factorial = function f(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0 || num === 1) {
    return 1;
  } else {
    return (num * f(num - 1));
  }
};

// 缓存代理函数
const proxyFunc = function (fn) {
  const cache = {};  // 缓存对象
  return function (num) {    
    if (num in cache) {
      return cache[num];   // 使用缓存代理
    }
    return cache[num] = fn.call(this, num);
  }
};

// 使用代理
const proxyFactorial = proxyFunc(factorial);
console.log(proxyFactorial(5)); // 120
console.log(proxyFactorial(5)); // 缓存取 120

