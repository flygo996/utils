// 求最长连续正常周期的长度
// const arr = '-1 1 2 3 100 10 13 9 10'.split(' ').map(Number)
// const [M, T, P] = '10 6 3'.split(' ').map(Number)
// 

const arr = '0 1 2 -1 4 3 6 7 6 6 10 11 12'.split(' ').map(Number)
const [M, T, P] = '5 3 3'.split(' ').map(Number)
console.log(arr)
console.log(M, T, P)
console.log(handle(arr, M, T, P))
function handle (s, M, T, P) {
  const dp = [] // 下标对应的总故障数(前面全部相加)
  for (let i = 0; i < s.length; i++) {
    dp[i] = 0
    if (i === 0) {
      if (s[i] <= 0) {
        dp[i] = 1
      }
    } else {
      if (s[i] <= 0 || s[i] < s[i - 1] || s[i] - s[i - 1] >= 10) {
        dp[i] = 1
      }
    }
  }
  console.log('dp', dp)
  // 判断工具故障情况，恢复故障情况
  // 发生故障的idx，和恢复故障的Idx
  const rst = judge(dp, M, T, P) // eg: [5,8,15] // -1表示到最后都没恢复
  console.log('judge', rst)
  return handleDp(dp, rst)
}

function judge (list, M, T, P) {
  const gzOrHf = [] // 奇数是故障，偶数是恢复的idx
  let i = 0
  while (i < list.length) {
    if (list[i] > 0 && list.slice(i, i + M).filter(e => e > 0).length >= T) {
      // 满足这个条件，表示i+M-1处已经发生了故障
      gzOrHf.push(i + M - 1)
      for (let j = i + M - 1; j < list.length; i++) {
        if (!list.slice(j, j + P).includes(1)) {
          gzOrHf.push(j)
          i = j // 从j开始重新计算
          break
        } else {
          i = list.length - 1
        }
      }
    } else {
      i++
    }
  }
  return gzOrHf
}
function handleDp (dp, list) {
  // 找到第一个0的开始(因为前面多个都不合格那就都不行，要丢弃)
  const idx = dp.findIndex(e => e === 0)
  const rst =
    idx > -1
      ? [...new Set([idx, ...list, dp.length - 1])]
      : [...new Set([...list, dp.length - 1])] // 合格的被rst分成了多个小片段
  console.log('rst', rst)
  let max = 0
  for (let i = 1; i < rst.length; i++) {
    if (rst[i] - rst[i - 1] > max) {
      max = rst[i] - rst[i - 1]
    }
  }
  return max + 1
}
