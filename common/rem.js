;(function (doc, win) {
  const docEle = doc.document
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalcFnc = function () {
    const clientWidth = docEle.clientWidth
    if (!clientWidth) return
    docEle.style.fontSize = (100 * clientWidth) / 750 + 'px'
    // docEle.style.fontSize = 200 * clientWidth / 320 + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalcFnc, false)
  doc.addEventListener('DOMCotentLoaded', recalcFnc, false)
})(document, window)
