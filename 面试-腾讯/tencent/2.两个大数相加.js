// num1,num2为字符串
function sum (num1, num2) {
  let len = num1.length
  if (len < num2.length) {
    len = num2.length
    num1 = num1.padStart(len, '0')
  } else {
    num2 = num2.padStart(len, '0')
  }
  console.log(num1, num2)
  let jinwei = 0
  let str = ''
  for (let i = len - 1; i >= 0; i--) {
    const cur = jinwei + +num1[i] + +num2[i]
    console.log(cur)
    str = (cur % 10) + str
    jinwei = ~~(cur / 10)
  }
  return jinwei > 0 ? jinwei + str : str
}
console.log(sum('81234567', '81234567')) // 162469134
console.log(sum('1000', '10000')) // 11000
