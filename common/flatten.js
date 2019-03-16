/*
 * @Author: laifeipeng 
 * @Date: 2019-03-16 21:12:24 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-16 21:31:56
 */
// 嵌套数组平铺展开
function flatten(arr) {
  let rst = [] // 注意后面要重新赋值，所以不能用const
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      rst = rst.concat(flatten(arr[i]))
    } else {
      rst.push(arr[i])
    }
  }
  return rst
}
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}
function flatten(arr) {
  let a = arr.slice()
  while (a.some(item => Array.isArray(item))) {
    a = [].concat(...a) //注意
  }
  return a
}
//[注意]描述
;[].concat([1,2,3])//=>[1, 2, 3]
;[].concat([1,2,[4,5]])//=>[1, 2, Array(2)]
;[].concat(...[1,2,[4,5]])//=>[1, 2, 4, 5]
// 所以，[注意]地方要用扩展运算符...

// 测试flatten
const a = [1, 2, [3, 4, [5, 6, '78']]]
flatten(a) // [1, 2, 3, 4, 5, 6, "78"]