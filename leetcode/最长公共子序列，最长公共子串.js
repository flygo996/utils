// 一，最长公共子序列

// 求最长公共子序列的长度
function lcs (str1, str2) {
  var len1 = str1.length
  var len2 = str2.length
  var dp = [] // 首先定义一个一维数组
  for (var i = 0; i <= len1; i++) {
    dp[i] = [] // 将一维数组升级为二维数组
    for (var j = 0; j <= len2; j++) {
      if (i == 0 || j == 0) {
        dp[i][j] = 0
        continue
      }
      if (str1[i - 1] == str2[j - 1]) {
        // dp 的维度为 (len1+1)*(len2+1),str 的维度为 (len1)*(len2)
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]) // 否则取当前位置上或左的最大数
      }
    }
  }
  return dp[len1][len2] // 返回二维数组最后一个值
}
console.log(lcs('abcda', 'bcdda')) // 4

// 打印出最长公共子序列
function lcs (str1, str2) {
  var len1 = str1.length,
    len2 = str2.length
  var dp = []
  for (var i = 0; i <= len1; i++) {
    dp[i] = []
    for (var j = 0; j <= len2; j++) {
      if (i == 0 || j == 0) {
        dp[i][j] = 0
        continue
      }
      if (str1[i - 1] == str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  var result = printLCS(dp, str1, str2, len1, len2)
  return result
}

// 打印公共子序列
function printLCS (dp, str1, str2, i, j) {
  if (i == 0 || j == 0) {
    return ''
  }
  if (str1[i - 1] == str2[j - 1]) {
    return printLCS(dp, str1, str2, i - 1, j - 1) + str1[i - 1]
  } else if (dp[i][j - 1] > dp[i - 1][j]) {
    return printLCS(dp, str1, str2, i, j - 1)
  } else {
    return printLCS(dp, str1, str2, i - 1, j)
  }
}
console.log(lcs('abcda', 'bcdda')) // bcda

// 二、最大公共子串
function findSubStr (str1, str2) {
  if (str1.length > str2.length) {
    var temp = str1
    str1 = str2
    str2 = temp
  }
  var len1 = str1.length,
    len2 = str2.length
  for (var j = len1; j > 0; j--) {
    for (var i = 0; i < len1 - j; i++) {
      var current = str1.substr(i, j)
      if (str2.indexOf(current) >= 0) {
        return current
      }
    }
  }
  return ''
}
console.log(findSubStr('aaa3333', 'baa333cc')) // aa333
console.log(findSubStr('aaaX3333--', 'baa333ccX3333333x')) // X3333

