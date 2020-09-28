// 给一个由域名组成的字符串进行按子域名分组的反转，比如 news.toutiao.com 反转成 com.toutiao.news 需要 in place 做
function reverseStr (str) {
  return str
    .split('.')
    .reverse()
    .join('.')
}
console.log(reverseStr('news.toutiao.com')) // com.toutiao.news
