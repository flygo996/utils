// 千分位符(支持正负数，小数；只有整数部分需要千分位符)
// 1.正则
function thousand (num) {
  const r = /(?<!\.\d+)\B(?=(\d{3})+\b)/g // (?<!\.\d+)改为(?<!\.)一样的效果
  return String(num).replace(r, ',')
}
console.log(thousand(12345678)) // 12,345,678
console.log(thousand(-123456789)) // -123,456,789
console.log(thousand(-12345678.12345)) // -12,345,678.12345

function thousand2 (num) {
  const r = /(?<!\.\d+)\d(?=(\d{3})+(\.|$))/g
  return String(num).replace(r, '$&,')
}
console.log(thousand2(12345678)) // 12,345,678
console.log(thousand2(-123456789)) // -123,456,789
console.log(thousand2(-12345678.12345)) // -12,345,678.12345

// 2.非正则
// toLocaleString只能保存3个小数点，不符合要求
function thousand3 (num) {
  return num.toLocaleString()
}
console.log(thousand3(12345678)) // 12,345,678
console.log(thousand3(-123456789)) // -123,456,789
console.log(thousand3(-12345678.12345)) // -12,345,678.123 // 只保存了3个小数！

// 手动插入 reduce
function thousand4 (num) {
  var str = Math.abs(num) + ''
  ;[integer, decimal] = str.split('.')
  const left = integer
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev
    })
  console.log('left:', left)
  const leftRight = decimal ? left + '.' + decimal : left
  if (num < 0) {
    return '-' + leftRight
  }
  return leftRight
}
console.log(4444444444)
console.log(thousand4(12345678)) // 12,345,678
console.log(thousand4(-123456789)) // -123,456,789
console.log(thousand4(-12345678.12345)) // -12,345,678.12345
