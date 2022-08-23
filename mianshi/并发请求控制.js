/* 请实现如下的函数，可以批量请求数据，
所有的 URL 地址在 urls 参数中，
同时可以通过 max 参数      
控制请求的并发度，当所有请求结束之后，
需要执行 callback 回调函数。
发请求的函数可以直接使用 fetch 即可 
https://juejin.im/post/6844903796506624014 优秀
*/
// 最好理解！
const sendRequest = (urls, max, cb) => {
  let finished = 0 // 完成请求的个数
  const total = urls.length
  const results = []
  const handler = () => {
    if (urls.length) {
      const url = urls.shift()
      fetch(url)
        .then((res) => {
          results.push(res)
          finished++ // 也可以放在finally里面
          handler() // 也可以放在finally里面
        })
        .catch(e => {
          results.push(e)
          throw Error(e)
        })
        .finally(() => { })
    }
    // 优化：这里可以直接else，这样可以省去下面的if判断，同时也可以少存一个finished变量
    if (finished >= total) {
      typeof cb === 'function' && cb(results)
    }
  }
  for (let i = 0; i < max; i++) {
    handler()
  }
}

// 2
function handleFetchQueue(urls, max, callback) {
  const urlCount = urls.length
  const requestsQueue = []
  const results = []
  let i = 0
  const handleRequest = url => {
    const req = fetch(url)
      .then(res => {
        const len = results.push(res)
        if (len < urlCount && i + 1 < urlCount) {
          requestsQueue.shift()
          handleRequest(urls[++i])
        } else if (len === urlCount) {
          'function' === typeof callback && callback(results)
        }
      })
      .catch(e => {
        results.push(e)
      })
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i])
    }
  }
  handleRequest(urls[i])
}
