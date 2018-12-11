/**
 * 乘法运算
 * 
 * @param a
 * @param b
 */

/* 提示：因为原生js会出现类似：
1.3*3=3.9000000000000004
5.3*9=47.699999999999996
的情况。所以共同乘以10的n次方，n为a、b两个数小数部分的最大长度值，这样就能一起化为整数运算
*/
const mul = (a, b) => {
  if (!a || !b) {
    console.log('Error: 乘法运算需要传入2个数字')
    return '乘法运算需要传入2个数字'
  }
  let c = 0 // a的小数部分长度
  let d = 0 // b的小数部分长度
  try {
    c = a.toString().split('.')[1].length
  } catch (f) { }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) { }

  return (Number(a.toString().replace('.', '')) * Number(b.toString().replace('.', ''))) / (10 ** (c + d))
}

export default mul
