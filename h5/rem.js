let timer;

/**
 * 初始化
 * 
 * @param {number} [scale=100] 基本字体大小
 * @author fcy
 */
function initRem(scale = 100) {
  setViewport();
  refreshRem(scale);

  window.addEventListener('resize', () => {
    dbcRefresh(scale);
  }, false);

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      dbcRefresh(scale);
    }
  }, false);
}


/**
 * 根据pixelratio设置viewport倍数
 *
 * @author fcy
 */
function setViewport() {
  let metaElem = document.querySelector('[name=viewport]');
  let ratio = window.devicePixelRatio || 1;
  if (navigator.userAgent.match(/OS 9_3/)) {
    ratio = 1;
  } else if (ratio > 2) {
    ratio = 2;
  }
  let content = `width=device-width, initial-scale=${1 / ratio},maximum-scale=${1 / ratio},minimum-scale=${1 / ratio}, user-scalable=no`;
  metaElem.setAttribute('content', content);
}

/**
 * 设置rem
 * 
 * @param {number} scale 
 * @author fcy
 */
function refreshRem(scale) {
  let docElem = window.document.documentElement;
  let width = docElem.getBoundingClientRect().width;
  // width = width > 750 ? 750 : width;
  let rem = scale * width / 375;
  docElem.style.fontSize = rem + 'px';
  let actualSize = parseFloat(window.getComputedStyle(window.document.documentElement)['font-size']);
  if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
    let remScaled = rem * rem / actualSize;
    docElem.style.fontSize = remScaled + 'px';
  }
}

/**
 * 节流刷新rem
 * 
 * @param {number} scale 
 * @author fcy
 */
function dbcRefresh(scale) {
  clearTimeout(timer);
  timer = setTimeout(() => refreshRem(scale), 100);
}

export default {
  initRem: initRem
};