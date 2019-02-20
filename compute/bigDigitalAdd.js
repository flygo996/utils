/*
 * @desc: 两个大数相加
 * @Author: laifeipeng 
 * @Date: 2019-02-17 18:08:46 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-17 18:22:26
 */
function add(x, y) {
  const a = x.toString();
  const b = y.toString();
  
  const lenA = a.length;
  const lenB = b.length;
  const len = lenA > lenB ? lenA : lenB;

  // 先补齐位数一致
  if (lenA === len) {
    for (let i = 0; i < len - lenB; i++) {
      b = '0' + b;
    }
  } else {
    for (let i = 0; i < len - lenA; i++) {
      a = '0' + a;
    }
  }

  let arrA = a.split('').reverse(),
    arrB = b.split('').reverse(),
    arr = [],
    carryAdd = 0;

  for (let i = 0; i < len; i++) {
    let temp = Number(arrA[i]) + Number(arrB[i]) + carryAdd;
    arr[i] = temp > 9 ? temp - 10 : temp;
    carryAdd = temp >= 10 ? 1 : 0;
  }

  if (carryAdd === 1) {
    arr[len] = 1;
  }

  return arr.reverse().join('');

}
add(12345678901234567890, 12345678901234567890)