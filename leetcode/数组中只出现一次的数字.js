// 一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。
function FindNumsAppearOnce (array) {
  // write code here
  // return list, 比如[a,b]，其中ab是出现一次的两个数字
  const map = {}
  for (let i = 0; i < array.length; i++) {
    if (map[array[i]]) {
      delete map[array[i]]
    } else {
      map[array[i]] = true
    }
  }
  return Object.keys(map)
}
module.exports = {
  FindNumsAppearOnce: FindNumsAppearOnce
}
