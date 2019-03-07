/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 11:41:06 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 12:11:07
 */

// 一、实现一个动态js资源的代码
function loadScript() {
  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];

  script.type = "text/javascript";
  script.src = '//i.alicdn.com/resource.js';

  // 绑定资源加载成功事件
  script.onreadystatechange = function () {
    // 判断资源加载状态是否为加载成功或加载完成
    if (/^(loaded|conplete)$/.test(script.readyState)) {
      script.onreadystatechange = null;
      // ...
    }
  }

  // 绑定资源加载失败事件
  script.onerror = function () {
    // ...
  }

  // 插入到head
  head.insertBefore(script, head.firstChild);
}


// 二、实现方法parse，作用如下
const obj = {
  b: {
    c: 4
  },
  d: [{
    e: 5
  }, {
    e: 6
  }]
}
console.log(parse(obj, 'b.c') === 4) // true
console.log(parse(obj, 'd[0].e') === 5) // true
console.log(parse(obj, 'd.0.e') === 5) // true
console.log(parse(obj, 'd[1].e') === 6) // true
console.log(parse(obj, 'd.1.e') === 6) // true
console.log(parse(obj, 'f') === 'undefined') // true

// 答案：
function parse(obj, str) {
  str.replace('[', '.').replace(']', '').split('.').map((ele) => obj = obj[ele.trim()])
  return obj || 'undefined'
}

