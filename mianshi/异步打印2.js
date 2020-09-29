console.log(1)
new Promise(function (resolve) {
  console.log(2)
  for (let i = 0; i < 1e4; i++) {
    i === 999 && resolve('a')
  }
  console.log(3)
  return 'b'
}).then(r => (console.log(4), console.log(r)))
console.log(5)

// 1-2-3-5-4-a
