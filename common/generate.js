/**
 * 生成32位数字+字母随机字符串
 * @return {string}
 * randomChar()=>"ortgpl4fa8uu2nmtoub83qorhbsuh0s9"
 */
export function randomChar() {
  const length = 32
  const x = '0123456789qwertyuioplkjhgfdsazxcvbnm' //长度=36，10个数字+26个字母
  let rst = ''
  for (var i = 0; i < length; i++) {
    rst += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return rst
}
