// 数组分成2份，它们各自的总和差值最小
// eg:[1,2,3,4]分成[1,4][2,3]

// 问题转化为0-1背包问题，如何找到一组元素，其总和最接近sum/2
function findArr (arr) {
  const sum = arr.reduce((acc, cur) => ((acc += cur), acc))
  // dp[i,j] // 代表前i件物体中总和最接近j的所有物品的总和(j为当前剩余容量)
  // 如果第i件物品放不下，则dp[i][j] = dp[i-1][j]
  // 如果第i件物品放得下，则dp[i][j] = dp[i-1][j-vec[i]]+vec[i]
  const rst = []
  for (let j = 0; j < Math.ceil(sum / 2); j++) {
    dp[(0, j)] = 0 // 没有放物品时，
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < sum / 2; j++) {
      if (j > arr[i]) {
        dp[(i, j)] = Math.max(dp[(i - 1, j)], dp[(i - 1, j - arr[i])] + arr[i])
      } else {
        dp[(i, j)] = dp[(i - 1, j)]
      }
    }
  }
}
