var lines = '3 2 3 4 2'.split(' ').map(e => +e)
console.log(lines)
const n = parseInt('2')
if (lines.length < 2 * n) {
  console.log(-1)
} else {
  const arr = [...new Set(lines)].sort((a, b) => a - b)
  console.log(arr)
  if (arr.length < 2 * n) {
    console.log(-1)
  } else {
    const min = arr.slice(0, n)
    const max = arr.slice(-n)
    console.log(min, max)
    const ans = [...min, ...max].reduce((acc, cur) => ((acc += cur), acc), 0)
    console.log(ans)
  }
}
