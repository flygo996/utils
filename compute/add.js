/**
 * 加法运算
 * 
 * @param a
 * @param b
 */

/* 提示：因为原生js会出现类似：
0.1+0.2=0.30000000000000004 
1.3+1.1=2.4000000000000004
的情况。所以共同乘以10的n次方，n为a、b两个数小数部分的最大长度值，这样就能一起化为整数运算
*/
const add = (a, b) => {
  if (!a || !b) {
    console.log('Error: 加法需要传入2个数字')
    return '加法需要传入2个数字'
  }
  let c = 0 // a的小数部分长度
  let d = 0 // b的小数部分长度
  try {
    c = a.toString().split('.')[1].length
  } catch (f) { }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) { }
  
  let e = 10 ** Math.max(c, d) //保证a、b为整数的最小10次幂
  return (a * e + b * e) / e
}

export default add
