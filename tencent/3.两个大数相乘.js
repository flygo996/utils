// https://blog.csdn.net/outsanding/article/details/79472376
// 思想：采用分治思想，每一位的相乘。
// 公式：AB*CD  =  AC (BC+ AD) BD,然后从后到前满十进位。
// num1,num2为字符串
function dazhenghsuMultiply (str1, str2) {
  let result = []
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      result[i + j] =
        (result[i + j] || 0) + parseInt(str1[i]) * parseInt(str2[j])
    }
  }
  console.log(result)
  for (let k = result.length - 1; k > 0; k--) {
    result[k - 1] += Math.floor(result[k] / 10)
    result[k] = result[k] % 10
  }
  console.log(result)
  return result.join('')
}
console.log('dazhenghsuMultiply')
console.log(dazhenghsuMultiply('888', '64')) // 56832
console.log(dazhenghsuMultiply('123', '64')) // 7872
console.log(dazhenghsuMultiply('89', '67')) // 5963
