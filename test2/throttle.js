function throttle(fnc, wait) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fnc.apply(this, args);
      canRun = true;
    }, wait);
  };
}
function throttle(fnc, wait) {
  let prevTime = Date.now();
  return function (...args) {
    let now = Date.now();
    if (now - prevTime >= wait) {
      fnc.apply(this, args);
      prevTime = now;
    }
  };
}
