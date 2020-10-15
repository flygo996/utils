/*
 * 获得金矿的最优收益--递归
 * @param V 总的可用的工人数量（相当于背包问题里面的容量）
 * @param weight 金矿开采所需要的工人数量（相当于背包问题里面的物品体积）
 * @param value  金矿储量（相当于背包问题里面的物品价值）
 */
function getBestGoldMining (V, n, weight, value) {
  if (V === 0 || n === 0) {
    return 0
  }
  if (V < weight[n - 1]) {
    return getBestGoldMining(V, n - 1, weight, value)
  }
  return Math.max(
    getBestGoldMining(V, n - 1, weight, value),
    getBestGoldMining(V - weight[n - 1], n - 1, weight, value) + value[n - 1]
  )
}
const V = 10
const weight = [5, 5, 3, 4, 3]
const value = [400, 500, 200, 300, 350]
console.log(getBestGoldMining(V, value.length, weight, value)) //900

/*
 * 动态规划
 */
function getBestGoldMiningV2 (V, weight, value) {
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
console.log(getBestGoldMiningV2(V, weight, value)) //900

/*
 * 动态规划2
 */
function getBestGoldMiningV3 (V, weight, value) {
  // 创建一维数组
  const dp = Array(V + 1).fill(0)
  console.log(dp)
  // 填充表格
  for (let i = 1; i <= value.length; i++) {
    for (let j = V; j >= 1; j--) {
      if (j >= weight[i - 1]) {
        dp[j] = Math.max(
          dp[j],
          dp[j - weight[i - 1]] + value[i - 1]
        )
      }
    }
  }
  // 返回最后1个格子的值
  console.log(dp)
  return dp[V]
}
console.log(getBestGoldMiningV3(V, weight, value)) //900
