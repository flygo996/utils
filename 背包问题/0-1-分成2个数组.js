/*
 * 一个数组分成2组，使他们的和的差值最小
 * eg:[1,3,4,6]分成[1,6]和[3,4]
 * 问题转化为找出一些元素，使之和与sum/2最接近
 * 又因为总和是一样的，找出一个数组<=sum/2，另外一个就是>=sum/2
 * 方便起见，我们找其中一组即可，我们选择<=sum/2的
 */

const arr = [2, 3, 5, 6]
const sum = arr.reduce((acc, cur) => ((acc += cur), acc))
const target = Math.ceil(sum / 2)
const weight = (value = arr)
function findArr (V, weight, value) {
  // 创建二维数组
  const dp = Array(value.length + 1).fill(Array(V + 1).fill(0))
  console.log(dp)
  // 填充表格
  for (let i = 1; i <= value.length; i++) {
    for (let j = 1; j <= V; j++) {
      if (j < weight[i - 1]) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weight[i - 1]] + value[i - 1]
        )
      }
    }
  }
  // 返回最后1个格子的值
  console.log(dp)
  return dp[value.length][V]
}

console.log(findArr(target, weight, value)) //900

/*
 * 动态规划2
 */
function findArr2 (V, weight, value) {
  // 创建一维数组
  const dp = Array(V + 1).fill(0)
  console.log(dp)
  // 填充表格
  for (let i = 1; i <= value.length; i++) {
    for (let j = V; j >= 1; j--) {
      if (j >= weight[i - 1]) {
        dp[j] = Math.max(dp[j], dp[j - weight[i - 1]] + value[i - 1])
      }
    }
  }
  // 返回最后1个格子的值
  console.log(dp)
  return dp[V]
}
console.log(findArr2(target, weight, value)) //900
