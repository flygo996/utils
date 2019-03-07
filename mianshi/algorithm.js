/*
 * @desc: 常见算法题
 * @Author: laifeipeng 
 * @Date: 2019-03-07 15:10:15 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 15:58:58
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
// 2 回文 - 正念反念都一样[不分大小写]//这里的解法是不考虑空格，如果要考虑那就把下面的正则改一下
function palindrome(str) {
  const new_str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('');
  return new_str.join('') === new_str.reverse().join('');
}
console.log(palindrome("never odd or even")) //true

/************************************************************************** */
// 3 找出句子中的最长单词
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