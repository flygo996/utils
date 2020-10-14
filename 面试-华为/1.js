function fn (lines, n, m) {
  if (lines.length < m) {
    return -1
  }
  if (n <= 0) {
    return -1
  }
  if (lines.length < 2 * n) {
    return -1
  }
  const arr = [...new Set(lines)].map(Number).sort((a, b) => a - b)
  if (arr.length < 2 * n) {
    return -1
  }
  const min = arr.slice(0, n)
  const max = arr.slice(-n)
  // console.log('min', min)
  // console.log('max', max)
  const ans = [...min, ...max].reduce((acc, cur) => ((acc += cur), acc), 0)
  return ans
}
// console.log(fn('95 88 83 64 100'.split(' ').map(Number), 2)) - 1
// console.log(fn('3 2 3 4 2'.split(' ').map(Number), 2))
while ((m = readline())) {
  var lines = readline()
    .split(' ')
    .slice(0, m)
    .map(Number)

  const n = parseInt(readline())
  console.log(fn(lines, n, m))
}
