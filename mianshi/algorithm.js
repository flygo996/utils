/*
 * @desc: 常见算法题
 * @Author: laifeipeng 
 * @Date: 2019-03-07 15:10:15 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 17:49:44
 */


/************************************************************************** */
// 1、反转一个整数（支持负数）
const reverseInteger = function (number) {
  const isNeg = number < 0
  const str = isNeg ? String(-number) : String(number)
  return +((isNeg ? '-' : '') + str.split("").reverse().join(""))
}

console.log(reverseInteger(-123)) // -321
console.log(reverseInteger(1234567)) // 7654321
console.log(reverseInteger(0)) // 0

/************************************************************************** */
// 2 回文 - 正念反念都一样[不分大小写]
//这里的解法是不考虑空格，如果要考虑那就把下面的正则改一下
function palindrome(str) {
  const new_str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('');
  return new_str.join('') === new_str.reverse().join('');
}
console.log(palindrome("never odd or even")) //true

/************************************************************************** */
// 3 找出句子中的最长单词
// Find the Longest Word in a String
function findLongestWord(str) {
  const new_str = str.split(" ");
  const arr = [];
  for (let i = 0; i < new_str.length; i++) {
    arr.push(new_str[i].length);
  }
  return arr.sort(function (a, b) {
    return b - a;
  })[0];//万一有多个，这个就不行了
}

findLongestWord("The quick brown fox jumped over the lazy dog");
/************************************************************************** */

// 2\确保字符串的每个单词首字母都大写，其余部分小写。
// Title Case a Sentence
function titleCase(str) {
  return str.toLowerCase().split(" ").map((item) => {
    return item.replace(item.charAt(0), item[0].toUpperCase())
  }).join(" ")
}
titleCase("I'm a little tea pot");  //结果：I'm A Little Tea Pot

/************************************************************************** */
// 5 返回数组中最大的数
// Return Largest Numbers in Arrays
function largestOfFour(arr) {
  // 请把你的代码写在这里
  var new_arr = [];
  for (var i = 0; i < arr.length; i++) {
    arr[i].sort(function (a, b) {
      return b - a;
    });
    new_arr.push(arr[i][0]);
  }
  return new_arr;
}
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);


/************************************************************************** */
// 6 判断字符串是否是指定字符结尾 
// Confirm the Ending
function confirmEnding(str, target) {
  // return new RegExp(target + '$').test(str);
  return str.substr(-target.length) === target;
}

confirmEnding("He has to give me a new name", "name");// true
confirmEnding("He has to give me a new name", "new"); // false


/************************************************************************** */
// 7 重复字符串指定次数
// Repeat a string repeat a string
function repeat(str, num) {
  if (num <= 0)
    return "";
  let rst = str
  for (var i = 1; i < num; i++)
    rst += str;
  return rst;
}
repeat("abc", 3); //'abcabcabc'

/************************************************************************** */
// 截断字符串
// Truncate a string
function truncate(str, num) {
  if (num >= str.length) return str;
  if (num <= 3) return str.slice(0, num) + "...";
  if (str.length > num) return str.slice(0, num - 3) + "...";
}

truncate("Absolutely Longer", 2); //'Ab...'
truncate("Absolutely Longer", 20); //'Absolutely Longer'
truncate("Absolutely Longer", 10); //'Absolut...'

/************************************************************************** */
// 指定数目 分割数组 
// Chunky Monkey
function chunk(arr, size) {
  const new_arr = [];
  for (let i = 0; i < arr.length; i += size) {
    new_arr.push(arr.slice(i, i + size));
  }
  return new_arr;
}

chunk(["a", "b", "c", "d", "e"], 2); // [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e' ] ]

/************************************************************************** */
// 实现两个数字之间所有数字的和
// Sum All Numbers in a Range
/*公式方法*/
function sumAll(a, b) {
  return (a + b) * (Math.abs(a - b) + 1) / 2; //（a + b）×（b - a + 1）÷2
}

/************************************************************************** */
// 替换字符串中指定字符
// Search and Replace
function myReplace(str, before, after) {
  if (before[0] === before[0].toUpperCase()) {
    after = after[0].toUpperCase() + after.slice(1);
  }
  str = str.replace(before, after);
  return str;
}
myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
// 'A quick brown fox leaped over the lazy dog'
myReplace("A quick brown fox jumped over the lazy dog", "Jumped", "leaped");
// 'A quick brown fox jumped over the lazy dog'
myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped");
// 'A quick brown fox Leaped over the lazy dog'

/************************************************************************** */
// 字母序列中找到缺失的字母并返回它,如果所有字母都在序列中，返回 undefined
// 遍历字符串，如果前一个字符的ASCII码不是后一个字符ASCII码+1，就判断为丢失字符，返回丢失的字符。
function fearNotLetter(str) {
  const rst = [];
  for (let i = 0, len = str.length; i < len; i++) {
    const gap = str.charCodeAt(i + 1) - str.charCodeAt(i);
    if (gap > 1) {
      for (let j = 1; j < gap; j++) {
        rst.push(String.fromCharCode(str.charCodeAt(i) + j))
      }
    }
  }
  return rst.length ? rst.join('') : undefined;
}

fearNotLetter("abce"); // d
fearNotLetter("abcg"); // def
fearNotLetter("acg"); // bdef
fearNotLetter("abc"); // undefined

/************************************************************************** */
// 将字符串中的字符 &、<、>、" （双引号）, 以及 ' （单引号）转换为它们对应的 HTML 实体。
// 简单粗暴法
function convert(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
convert("Dolce & Gabbana"); // 'Dolce &amp; Gabbana'

// 这个是另一种思路 对象~~~
function convert(str) {
  const map = {
    "&": '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  };
  const rst = str.split(" ").map(function (val) {
    if (map.hasOwnProperty(val)) {
      return map[val];
    } else {
      return val;
    }
  });
  return rst.join(" ");
}
convert("Dolce & Gabbana"); //'Dolce &amp; Gabbana'

/************************************************************************** */
// 将字符串转换为 spinal case。Spinal case 是 
// all-lowercase-words-joined-by-dashes 这种形式的，也就是以连字符连接所有小写单词。
function spinalCase(str) {
  return str.replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1") // 匹配大写字母，并在前面加上空格
    .replace(/^\s/, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}
spinalCase('This Is Spinal Tap'); // 'this-is-spinal-tap'
spinalCase('ThisIsSpinalTap'); // 'this-is-spinal-tap'
spinalCase('This_Is_Spinal_Tap'); // 'this-is-spinal-tap'

/************************************************************************** */
// 求小于等于给定数值的所有质数之和。
// Sum All Primes
function sumPrimes(num) {
  let sum = 0;
  const arr = [];//存所有质数
  for (let i = 2; i <= num; i++) {
    let flag = true;
    for (let j = 2; j < i / 2; j++) {
      if (i % j == 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      arr.push(i);
      sum += i;
    }
  }
  // return arr
  return sum
}
sumPrimes(10)//17

/************************************************************************** */

// .写一个 function，它遍历数组 arr，并返回数组中第一个满足 func 返回值的元素。
// 举个例子，如果 arr 为 [1, 2, 3]，func 为 function(num) {return num === 2; }，那么 find 的返回值应为 2。
function findElement(arr, func) {
  const rst = arr.filter((val) => {
    return func(val);
  });
  return rst.length ? rst[0] : undefined;
}
findElement([1, 3, 5, 8, 9, 10], (num) => num % 2 === 0); // 8 
findElement([1, 3, 5, 8, 9, 10], (num) => !(num % 2)); // 8

/************************************************************************** */

// 对嵌套的数组进行扁平化处理
function steamroller(arr) {
  const rst = []
  function asdf(ifarr) {
    if (Array.isArray(ifarr)) {
      return ifarr.forEach((item) => { return asdf(item) })
    } else {
      rst.push(ifarr)
    }
  }
  asdf(arr)
  return rst
}

steamroller([1, [2], [3, [[4]]]]); // [ 1, 2, 3, 4 ]
steamroller([[["a"]], [["b"]]]); // [ 'a', 'b' ]

/************************************************************************** */

// 传入二进制字符串，翻译成英语句子并返回。
// Binary Agents

function binaryAgent(str) {
  let rst = "";
  str
    .split(" ")
    .map(function (item) {
      return parseInt(item, 2); //循环做进制转换
    })
    .forEach(function (item) {
      rst += String.fromCharCode(item); // 返回使用指定的Unicode值序列创建的字符串，然后拼接字符串
    });
  return rst;
}
binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
// 'Aren\'t bonfires fun!?'

/************************************************************************** */

// 创建两个参数之和func 如果只提供了一个参数，则返回一个函数，这个函数与原来的函数功能要一样;
// 如果任何一个参数不是有效数字，则返回undefined
function add(...args) {
  //判断是否是number
  const isFinite = args.every(function (item) { return Number.isFinite(item) })
  // 如果没有参数，或者参数无限值，则直接返回undefined
  if (!args.length || !isFinite) {
    return undefined
  }
  if (args.length === 2)
    return args[0] + args[1]
  else { // 参数是一个但是二次执行 返回函数
    //保留参数一的值
    const first = args[0]
    //返回一个函数 把第二次执行需要的参数与第一次相加
    return (b) => {
      if (Number.isFinite(b)) {
        return first + b;
      } else {
        return undefined;
      }
    };
  }
}
add(); // undefined
add(2); // [Function]
add(2,3); // 5
add(2)(3); // 5

/************************************************************************** */