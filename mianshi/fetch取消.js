// 一，取消单个
const controller = new AbortController();
const { signal } = controller;

fetch("http://localhost:8000", { signal }).then(response => {
    console.log(`Request 1 is complete!`);
}).catch(e => {
    console.warn(`Fetch 1 error: ${e.message}`);
});

// Abort request
controller.abort();

/**
// 取消多个
const controller = new AbortController();
const { signal } = controller;

fetch("http://localhost:8000", { signal }).then(response => {
    console.log(`Request 1 is complete!`);
}).catch(e => {
    console.warn(`Fetch 1 error: ${e.message}`);
});

// Abort request
controller.abort();
*/

// 通用
function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal })
  };
}
