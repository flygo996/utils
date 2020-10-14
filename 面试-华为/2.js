// 10进制转M进制,n为幸运数
// 10进制数为k
// 求包含多少个幸运数
while ((line = readline())) {
  ;[k, n, m] = line.split(' ').map(Number)
  let str = []
  while (k >= m) {
    str.push(k % m)
    k = ~~(k / m)
  }
  str.push(k)
  const ans = str.filter(e => +e === +n).length
  console.log(ans)
}
