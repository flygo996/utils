function debounce (fn, wait) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
}
// 时间戳版
function throttle (fn, wait) {
  let prev = 0
  return function (...args) {
    const now = Date.now()
    if (now - prev >= wait) {
      prev = now
      fn.apply(this, args)
    }
  }
}
// 定时器版
function throttle (fn, wait) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, wait)
    }
  }
}
