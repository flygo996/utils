// 一，最长公共子序列(只打印长度)
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

// 二，最长公共子序列（打印具体序列）
function lcs2 (str1, str2) {
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
console.log(lcs2('abcda', 'bcdda')) // bcda

// 三、最大公共子串（具体字符）
function findSubStr (str1, str2) {
  var len1 = str1.length
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
console.log(findSubStr('aaa33', 'baa333cc')) // aa333
console.log(findSubStr('aaaX3333--', 'baa333ccX3333333x')) // X3333
// 四，最长公共子串
// 该方法主要用于查找最长公共子串，特别是用于关键词查找和标红：
var LCS = function (str_1, str_2) {
  if (str_1 == '' || str_2 == '') {
    return ''
  }
  var c = new Array(str_1.length) //记录矩阵某一行状态的数组
  var max = 0 //记录最大长度
  var maxi = 0 //记录最大长度在str_1中的位置
  //str_1横排(位置用i标记) str_2竖排(位置用j标记)
  for (var j = 0; j < str_2.length; j++) {
    //从上到下依次在列中取一个字符
    for (var i = str_1.length - 1; i >= 0; i--) {
      //从右到左依次在行中取一个字符(为什么要从右到左？见下)
      if (str_1.charAt(i) == str_2.charAt(j)) {
        //拿行的第i个字符跟列的第j个字符比较
        if (i == 0 || j == 0) {
          c[i] = 1
        } else {
          c[i] = c[i - 1] + 1
          //这就是为什么要从右到左，因为要用到前一个位置的值，从左到右就覆盖了这个值
        }
      } else {
        c[i] = 0
      }
      if (c[i] > max) {
        max = c[i]
        maxi = i
      }
    }
  }
  if (max == 0) {
    return ''
  }
  return str_1.substr(maxi - max + 1, max) //获得最长公共子串
}
console.log(LCS('aaa3333', 'baa333cc')) // aa333
console.log(LCS('aaaX3333--', 'baa333ccX3333333x')) // X3333

// 五，最长无重复子串（长度）
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var res = 0 // 用于存放当前最长无重复子串的长度
  var str = '' // 用于存放无重复子串
  var len = s.length
  for (var i = 0; i < len; i++) {
    var char = s.charAt(i)
    var index = str.indexOf(char)
    if (index === -1) {
      str += char
      res++
    }
  }
  // return str
  return res
}
console.log(lengthOfLongestSubstring('aaa3333')) // 2 (a3)
console.log(lengthOfLongestSubstring('aaa3rf333')) // 4 (a3rf)
