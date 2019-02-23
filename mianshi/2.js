/*
 * @Author: laifeipeng 
 * @Date: 2019-02-21 17:50:13 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-23 20:37:56
 */

// 1、判断回文字符串
// 法一
function palindRome(str) {
  const len = str.length;
  let rst = "";
  for (let i = len - 1; i >= 0; i--) {
    rst += str[i];
  }
  return rst === str;
}
// 法二
function palindRome2(str) {
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (str.charAt(i) !== str.charAt(len - 1 - i)) {
      return false;
    }
  }
  return true;
}

// 2、翻转字符串
function reverseString(str) {
  // return str.split('').reverse().join('');
  return [...str].reverse().join('');
}

// 3、生成指定长度随机字符串
function randomString(n) {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let rst = '';
  for (let i = 0; i < n; i++) {
    rst += str.charAt(Math.round(Math.random() * str.length));
  }
  return rst;
}
function randomString2(n) {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const arr = Array.from({ length: n }, () => str.charAt(Math.round(Math.random() * str.length)));
  return arr.join('');
}

// 4、统计字符串中次数最多字母
function findMaxDuplicateChar(str) {
  if (str.length == 1) {
    return str;
  }
  const charObj = {};
  for (let i = 0; i < str.length; i++) {
    if (!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    } else {
      charObj[str.charAt(i)] += 1;
    }
  }
  let maxChar = '';
  let maxValue = 1;
  for (const k in charObj) {
    if (charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar + '：' + maxValue;
}

function findMaxDuplicateChar2(str) {
  if (str.length == 1) {
    return str;
  }
  const strArr = [...str];
  const charObj = {};
  let maxChar = '';
  let maxValue = 0;
  strArr.forEach(c => {
    charObj[c] = charObj[c] === undefined ? 1 : charObj[c] + 1;
    if (charObj[c] > maxValue) {
      maxValue = charObj[c];
      maxChar = c;
    }
  })
  return maxChar + '：' + maxValue;
}

// 5、数组中最大差值
function getMaxDiff(arr) {
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  return max - min;
}
function getMaxDiff(arr) {
  let min = arr[0];
  let max = arr[0];
  arr.forEach(value => {
    if (value < min) min = value;
    if (value > max) max = value;
  })
  return max - min;
}
function getMaxDiff(arr) {
  return Math.max(...arr) - Math.min(...arr);
}

// 6、数组去重
function unique(arr) {
  return arr.filter((ele, index, array) => {
    return index === array.indexOf(ele)
  })
}

function unique(arr) {
  // return Array.from(new Set(arr));
  return [...(new Set(arr))];
}




// 7、阶乘
// 非递归实现
function factorialize(num) {
  let rst = 1;
  if (num < 0) return -1;
  if (num == 0 || num == 1) return 1;
  while (num > 1) {
    rst *= num--;
  }
  return rst;
}
// 递归实现
function factorialize(num) {
  if (num < 0) return -1;
  if (num == 0 || num == 1) return 1;
  if (num > 1) return num * factorialize(num - 1);
}

// 8、二分查找(原数组必须升序，否则不行)
// 下面的实现是针对升序数组的
// 非递归实现
function binary_search(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = ~~((high + low) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      low = mid + 1;
    } else if (target < arr[mid]) {
      high = mid - 1;
    }
  }
  return -1;
}
// 递归实现
function binary_search2(arr, target) {
  function search(arr, low, high, target) {
    if (low > high) return -1;
    const mid = ~~((low + high) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      return search(arr, mid + 1, high, target);
    } else if (target < arr[mid]) {
      return search(arr, low, mid - 1, target);
    }
  }
  return search(arr, 0, arr.length - 1, target)
}
