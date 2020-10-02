function decimal2Binary (num) {
  if (+num === 0) {
    return 0
  }
  let res = ''
  while (num) {
    res = (num % 2) + res
    num = Number.parseInt(num / 2)
  }
  return +res
}
for (let i = 0; i < 10; i++) {
  console.log(i, '-->', decimal2Binary(i))
}
// 0 '-->' 0
// 1 '-->' 1
// 2 '-->' 10
// 3 '-->' 11
// 4 '-->' 100
// 5 '-->' 101
// 6 '-->' 110
// 7 '-->' 111
// 8 '-->' 1000
// 9 '-->' 1001

function binary2Decimal (num) {
  let res = 0
  let count = 1
  num = num + ''
  while (num) {
    res += count * num[num.length - 1]
    count *= 2
    num = num.substring(0, num.length - 1)
  }
  return res
}
for (let i = 0; i < 20; i++) {
  console.log(
    i,
    '-->',
    decimal2Binary(i),
    '-->',
    binary2Decimal(decimal2Binary(i)),
    binary2Decimal2(decimal2Binary(i))
  )
}
// 注意reduceRight的idx还是按照原始的idx排列的，不是从右侧开始算！
function binary2Decimal2 (num) {
  return String(num)
    .split('')
    .reduceRight(
      (acc, cur, idx, arr) => ((acc += cur * 2 ** (arr.length - 1 - idx)), acc),
      0
    )
}
console.log(
  String(10010)
    .split('')
    .reduceRight((acc, cur, idx, arr) => {
      console.log(acc, cur, idx, arr)
      acc += cur * 2 ** (arr.length - 1 - idx)
      return acc
    }, 0)
)
