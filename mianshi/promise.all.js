// 最好的处理
function diPromiseAll (promises) {
  const iterator = Symbol.iterator
  if (!promises[iterator]) return
  return new Promise((resolve, reject) => {
    let result = [] // 存放结果
    let count = 0 // 记录有几个resolved
    for (let promise of promises) {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(i)
      }
      promise.then(
        res => {
          result.push(res)
          count++
          count === promises.length && resolve(result) // 判断是否已经完成
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

// 1
/* Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
如果有成员不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

我们来实现一下
*/
function Promiseall (promises) {
  const iterator = Symbol.iterator
  if (!promises[iterator]) return
  return new Promise((resolve, reject) => {
    const resolvearr = []
    const rejectarr = []
    for (let i of promises) {
      if (!(i instanceof Promise)) {
        i = Promise.resolve(i)
      }
      i.then(res => {
        resolvearr.push(res)
      }).catch(err => {
        rejectarr.push(err)
      })
    }
    setTimeout(() => {
      return rejectarr.length === 0 ? resolve(resolvearr) : reject(rejectarr[0])
    }, 0)
  })
}
const p1 = new Promise(res => res(1))
const p2 = new Promise((res, rej) => rej(2))
const p3 = new Promise((res, rej) => rej(3))
const p4 = '4'
const su = x([p1, p2, p3, p4])
su.then(res => {
  console.log(res)
}).catch(res => {
  console.log(res)
})

// 2
Promise.all = arr => {
  let aResult = [] //用于存放每次执行后返回结果
  return new Promise(function (resolve, reject) {
    let i = 0
    next() // 开始逐次执行数组中的函数(重要)
    function next () {
      arr[i].then(function (res) {
        aResult.push(res) // 存储每次得到的结果
        i++
        if (i == arr.length) {
          // 如果函数数组中的函数都执行完，便resolve
          resolve(aResult)
        } else {
          next()
        }
      })
    }
  })
}
