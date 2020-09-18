// 题目描述
// 给出一个仅包含字符'(',')','{','}','['和']',的字符串，判断给出的字符串是否是合法的括号序列
// 括号必须以正确的顺序关闭，"()"和"()[]{}"都是合法的括号序列，但"(]"和"([)]"不合法。
/**
 *
 * @param s string字符串
 * @return bool布尔型
 */
function isValid (s) {
  if (s.length % 2) {
    return false
  }
  const stack = [s[0]]
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  }
  for (let i = 1; i < s.length; i++) {
    if (
      Object.keys(map).includes(s[i]) && 
      stack[stack.length - 1] === map[s[i]] // stack最后一个刚好可以跟它配对
    ) {
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }
  return !stack.length
}
module.exports = {
  isValid: isValid
}
