(() => {
  /** 判断如果是PC，则跳转到PC域名 */
  const v = versions()
  if (!v.iPhone && !v.android) {
    window.location.href = 'https://www.baidu.com'
  }

  function versions() {
    let ua = navigator.userAgent
    return {
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
      iPhone: ua.indexOf('iPhone') > -1,
      iPad: ua.indexOf('iPad') > -1
    }
  }
})()
