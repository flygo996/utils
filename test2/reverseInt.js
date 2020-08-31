/**
 * 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
 * @case 1234 => '4321'
 * @case 1000 => '1'
 * @case -1000 => '-1'
 * @case -1234 => '-4321'
 *
 * @param {number} number 传入的数值
 */
function solution(number) {
  if (number < 0) {
    return `-${solution(Math.abs(number))}`;
  }
  if (number < 10) {
    return number;
  }
  return `${number % 10 || ''}${solution(~~(number / 10))}`;
}

const assert = require('assert').strict;

assert.strictEqual(solution(1234), '4321');
assert.strictEqual(solution(1000), '1');
assert.strictEqual(solution(-1234), '-4321');
assert.strictEqual(solution(-1000), '-1');
