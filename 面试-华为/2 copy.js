// 10进制转M进制
// 10进制数为k
const stack = []
const M = 2
let str = ''
let k = 5
while (k >= M) {
  str += k % M
  k = ~~(k / M)
}
str += k
