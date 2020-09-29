for (var i = 0; i < 10; i++) {
  console.log(i) // 0-9
}
for (var j = 0; j < 10; j++) {
  setTimeout(() => {
    console.log(j) // 10个10
  })
}
for (let j = 0; j < 10; j++) {
  setTimeout(() => {
    console.log(j) // 0-9
  })
}
