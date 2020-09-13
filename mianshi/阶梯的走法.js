// n个阶梯，每次只能走1个或2个，问一共有多少个走法？
// 1.动态规划
function getSum (n) {
  const dp = []
  for (let i = 0; i <= n; i++) {
    if (i === 0 || i === 1 || i === 2) {
      dp[i] = i
    } else {
      dp[i] = dp[i - 1] + dp[i - 2]
    }
  }
  console.log(dp)
  return dp[n]
}
// 2.递归
function f (n) {
  if (n <= 2) return n
  return f(n - 1) + f(n - 2)
}
// 3.迭代
function ff (n) {
  if (n <= 2) return n
  let [first, second] = [1, 2]
  for (let i = 3; i <= n; i++) {
    ;[first, second] = [second, first + second]
  }
  return second
}
console.log(getSum(1), f(1), ff(1))
console.log(getSum(2), f(2), ff(2))
console.log(getSum(3), f(3), ff(3))
console.log(getSum(4), f(4), ff(4))
console.log(getSum(5), f(5), ff(5))
