function debounce(fnc, wait) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fnc.apply(this, args);
    }, wait);
  };
}

function debounce(fnc, wait, immediate = true) {
  let timer = null;
  return function (...args) {
    if (immediate && !timer) {
      fnc.apply(this, args);
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fnc.apply(this, args);
    }, wait);
  };
}
