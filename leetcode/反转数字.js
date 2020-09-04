// 题目描述
// 将给出的整数x翻转。
// 例1:x=123，返回321
// 例2:x=-123，返回-321

// 你有思考过下面的这些问题么？
// 如果整数的最后一位是0，那么输出应该是什么？比如10,100
// 你注意到翻转后的整数可能溢出吗？假设输入是32位整数，则将翻转10000000003就会溢出，你该怎么处理这样的样例？抛出异常？这样做很好，但是如果不允许抛出异常呢？
// 这样的话你必须重新设计函数（比如添加一个额外的参数）。

/**
 *
 * @param x int整型
 * @return int整型
 */
function reverse (x) {
  // write code here
  const isNegative = x < 0
  const reverseStr = String(Math.abs(x))
    .split('')
    .reverse()
    .join('')
  return isNegative ? -Number(reverseStr) : Number(reverseStr)
}
module.exports = {
  reverse: reverse
}
