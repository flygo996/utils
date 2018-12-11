
/**
 * 除法运算
 * 
 * @param a
 * @param b
 */

/* 提示：因为原生js会出现类似：
0.3/0.1=2.9999999999999996
0.6/3=0.19999999999999998
的情况。所以共同乘以10的n次方，n为a、b两个数小数部分的最大长度值，这样就能一起化为整数运算
*/
const div = (a, b) => {
  if (!a || !b) {
    console.log('Error: 减法运算需要传入2个数字')
    return '减法运算需要传入2个数字'
  }
  let c = 0 // a的小数部分长度
  let d = 0 // b的小数部分长度
  try {
    c = a.toString().split('.')[1].length
  } catch (f) { }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) { }

  const fenzi = Number(a.toString().replace('.', '')) * (10 ** (c + d))
  const fenmu = Number(b.toString().replace('.', '')) * (10 ** (c + d))
  return fenzi / fenmu / (10 ** (c - d))
}

export default div
