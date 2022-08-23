/**
 * 防抖函数
 * @param {Function} fn  执行函数
 * @param {Number} delay 延迟执行函数的时间，单位ms，默认为500
 * @param {Boolean} isImmediate 是否立即执行一次，默认为true
 */
export function debounce(fn, delay = 500, isImmediate = true) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    if (isImmediate) {
      // 根据距离上次触发操作是否到达dalay来决定是否要现在执行函数
      const doNow = !timer
      // 每次都重新设置timer，就是要保证每一次执行的至少delay毫秒后才可以执行
      timer = setTimeout(function () {
        timer = null
      }, delay)
      // 立即执行
      doNow && fn.apply(this, arguments)
    } else {
      timer = setTimeout(function () {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}

// 第五版
function debounce(func, wait, immediate) {

  var timeout, result;

  return function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
    return result;
  }
}

/**
 * 节流函数
 * @param {Function} fn       执行函数
 * @param {Number(ms)} delay  每次执行函数的延迟时间，单位ms，默认为1000
 * @param {Number(ms)} mustRunDelay 多长时间需要执行一次，单位ms，默认为0
 * @param {Boolean} isImmediate 是否立即执行一次，默认为false
 */
export function throttle(fn, delay, mustRunDelay, isImmediate = false) {
  let timer = null
  let start = 0
  let now = 0
  return function () {
    const context = this
    const args = arguments
    now = Date.now()
    if (!start) {
      start = now
    }
    if (isImmediate || now - start >= mustRunDelay) {
      fn.apply(context, args)
      start = Date.now()
      isImmediate = false
    } else {
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}

function throttle2(fn, delay) {
  let lastTime = 0
  return function () {
    const nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      fn.call(this)
      lastTime = nowTime
    }
  }
}


/**
 * 给对象/对象数组的数值型属性值转为字符串型，用于在与java后台交互的时候，他们要字符串型
 * @param {any} o
 * @return {any} 处理后的o
 * toStringValue(5)=>"5"
 * toStringValue({a:5})=>{a: "5"}
 */
export function toStringValue(o) {
  if (o instanceof Array) {
    const rst = []
    for (const k in o) {
      rst[k] = toStringValue(o[k])
    }
    return rst
  } else if (type === 'Object') {
    for (const k in o) {
      o[k] = toStringValue(o[k])
    }
  } else if (type === 'Number') {
    o = '' + o
  }
  return o
}

/**
 * 对象数组，由k1属性的值获取k2属性的值
 * @param {Array} arr
 * @param {any} val
 * @param {String} k1
 * @param {String} k2
 * @return {any} 
 * const arr=[{key:1,name:"lily"},{key:2,name:"lucy"}]
 * getNameByKey(arr,2,'key','name')=>"lucy"
 */
export function getNameByKey(arr, val, k1, k2) {
  // 假定参数都传进来了，这里不做校验
  if (!(array instanceof Array)) {
    return 'Error: 传入的arr必须是Array'
  } else if (!arr.length) {
    return 'Error: 传入的arr不能是空数组'
  } else if (!Object.keys(arr[0]).includes(k1)) {
    return `Error: 对象数组arr的元素不包含${k1}属性`
  } else if (!Object.keys(arr[0]).includes(k2)) {
    return `Error: 对象数组arr的元素不包含${k2}属性`
  }
  const o = arr.find(o => o[k1] === val)
  return o && o[k2]
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
* 数组格式转树状结构
* @param   {array}     array
* @param   {String}    id
* @param   {String}    pid
* @param   {String}    children
* @return  {Array}
*/
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  const data = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });
  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

/**
* 树状格式转tree-菜单专用
* @param   {array}     array
* @param   {String}    id
* @param   {String}    pid
* @param   {String}    children
* @return  {Array}
*/
const treeToMenuTree = (tree) => {
  const array = [];
  tree.forEach((val) => {
    const hash = {};
    hash.label = val.name;
    hash.value = val.id;
    hash.key = val.id;
    val.parentId ? hash.parentId = val.parentId : '';
    val.mpid ? hash.mpid = val.mpid : '';
    if (val.children) hash.children = treeToMenuTree(val.children);
    array.push(hash);
  });
  return array;
};

// 把属性值为undefined、null、空的属性剔除
const trimObj = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') trimObj(obj[key]);
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') delete obj[key];
  });
  return obj;
};

// 深复制，支持大部分类型
const deepClone = (values) => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (values == null || typeof values !== 'object') return values;

  // Handle Date
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  // Handle Array
  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy values! Its type isn't supported.");
};

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : (`00${o[k]}`).substr(`${o[k]}`.length));
    }
  }
  return format;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(_arr) {
  let arr = _arr.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80]
console.log(arr)
console.log(shuffle(arr))
// [10, 20, 30, 40, 50, 60, 70, 80]
// [20, 50, 70, 80, 40, 10, 30, 60]