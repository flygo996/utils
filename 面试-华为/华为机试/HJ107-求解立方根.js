// 牛顿迭代法。设f(x)=x3-y, 求f(x)=0时的解x，即为y的立方根。
// 根据牛顿迭代思想，xn+1=xn-f(xn)/f'(xn)即x=x-(x3-y)/(3*x2)=(2*x+y/x/x)/3;
const str = readline()
function lfg (y) {
  let x = 1
  while (Math.abs(x ** 3 - y) > 1e-7) {
    x = (2 * x + y / x / x) / 3
  }
  return x.toFixed(1)
}
console.log(lfg(Number(str)))
