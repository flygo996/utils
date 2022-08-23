// 给定一个只包含三种字符的字符串：左括号 (、右括号 ) 以及星号 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：

// 任何左括号 ( 必须有相应的右括号 )。
// 任何右括号 ) 必须有相应的左括号 (。
// 左括号 ( 必须在对应的右括号之前 )。
// * 可以被视为单个右括号 )，或单个左括号 (，或一个空字符串。
// 一个空字符串也被视为有效字符串。

// 例子：(*)****)))))***
// ()
// (*
// (*)
// (()())

// 维护一个需要右括号的区间
function f(str) {

}

// 使用正则表达式将 URL 解析为 location 对象

// 'https://huodong.bytedance.com:3000/a/b/c?k=v&b=2#q'

// {
//   hash: "#q"
//   host: "huodong.taobao.com:3000"
//   hostname: "huodong.taobao.com"
//   href: "https://huodong.taobao.com:3000/a/b/c?k=v&b=2#q"
//   origin: "https://huodong.taobao.com:3000"
//   pathname: "/a/b/c"
//   port: "3000"
//   protocol: "https:"
//   search: "?k=v&b=2"
// }
const str = 'https://huodong.bytedance.com:3000/a/b/c?k=v&b=2#q'
const r = /(.+):\/\/(.+):(\d+)((\/\w)?)(\?.+)(#.+)/
console.log(r.exec(str));
