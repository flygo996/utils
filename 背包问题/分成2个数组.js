// https://www.cnblogs.com/z2529827226/p/11625373.html

function findArr(arr) {
  const sum = arr.reduce((acc, cur) => ((acc += cur), acc))
  if (sum % 2) {
    return false
  }
  const n = sum / 2
  const dp = Array(n + 1).fill(Array(n + 1).fill(0))
  for (let i = 0; i < n; ++i) {
    dp[0][i] = true
  }
  console.log(dp)
  for (let i = 1; i < arr.length; ++i) {
    for (let j = 0; j <= n; ++j) {
      if (j > arr[i]) {
        dp[i][j] = dp[i - 1][j - arr[i]] //如果大于的话就看它的dp[i][j]=dp[i-1][j-arr[i]]为不为true，如果为true则这个也为true
      }
      if (j == arr[i]) {
        //相等则赋值为true，因为只有在它的子序列中找到一个能正好填满背包的值就可以
        dp[i][j] = true
      } else {
        //小于时保持上一次的值
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  console.log(dp)
  return dp[arr.length - 1][n]
}

const arr = [2, 3, 5, 6]
console.log(findArr(arr))
