// 这里是px转rem代码
const baseSize = 16;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于750px 宽的缩放比例，可以根据自己需要修改。
  const scale = document.documentElement.clientWidth / 375;
  // 设置页面根结点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};

/**
 * @desc 设置根据界面宽度375比16px进行响应式适配。如果嫌麻烦，也可以直接使用 postcss-pxtorem 设置"selectorBlackList":[".ignore",".hairlines","van"],忽略框架代码（本例不建议）。
 */
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    reCalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, reCalc, false);
  doc.addEventListener('DOMContentLoaded', reCalc, false);
})(document, window);
