/*
给出一个仅包含字符'('和')'的字符串，计算最长的格式正确的括号子串的长度。
对于字符串"(()"来说，最长的格式正确的子串是"()"，长度为2.
再举一个例子：对于字符串")()())",来说，最长的格式正确的子串是"()()"，长度为4.
再如 ")(())((()))(" ==>10
*/

/*
思路：
dp[i]表示以i结尾最长合法字符串。
如果s[i]=='('时该字符串一定不合法；
当s[i]==')'时，假设存在解，那么该右括号与其对应的左括号之间的字符串一定是合法的。
因此对于i-1的位置，以i-1结尾的合法字符串的开头下标为i - dp[i - 1]，
当其前一个位置s[i - 1 - dp[i - 1]] == '('时，可以与s[i]进行匹配，dp[i]更新为dp[i - 1] + 2。
此时还需要注意，如果在与当前右括号匹配的左括号的前一个位置(i - 1 - dp[i - 1]) - 1，
以该处为结尾的最长合法字符串不为0，也需要加到结果上。例如()()。
*/

/**
 *
 * @param s string字符串
 * @return int整型
 */
function longestValidParentheses (s) {
  // write code here
  if (!s) {
    return 0
  }
  let res = 0
  // dp[i]是i位置的合法的最长长度
  const dp = Array(s.length).fill(0) // 一定要先设置默认值0！！
  for (let i = 1; i < s.length; i++) {
    // 如果是'('直接跳过，（此时dp[i]还是为默认值0）
    if (s[i] == ')') {
      const prev = i - 1 - dp[i - 1] // dp[i-1]是合法的最长长度，i-1是i的前1个下标，i-1-dp[i-1]是上一个最长合法的前一个下标
      if (prev >= 0 && s[prev] == '(') {
        dp[i] = dp[i - 1] + 2
        if (prev - 1 >= 0) {
          dp[i] += dp[prev - 1] // 还要加上匹配位置之前的最长长度dp[i]+=dp[i-dp[i]]
        }
      }
    }
    res = Math.max(res, dp[i])
  }

  return res
}
module.exports = {
  longestValidParentheses: longestValidParentheses
}
