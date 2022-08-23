const delay = (ms, value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });

const delay2 = (ms, callback) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(callback()), ms);
  });

async function t() {
  const r = await delay(2, 100);
  console.log(r);
}
t()