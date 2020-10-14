const str = readline()
const [a, b] = str.split(' ')

function gys (num1, num2) {
  if (num1 - num2 < 0) {
    ;[num1, num2] = [num2, num1]
  }
  while (num2 != 0) {
    ;[num1, num2] = [num2, num1 % num2]
  }
  return num1 //此时返回的就是最大公约数
}

function scm (a, b) {
  return (a * b) / gys(a, b)
}
console.log(scm(a, b))
