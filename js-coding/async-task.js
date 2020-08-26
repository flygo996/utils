console.log('a')
setTimeout(() => {
    console.log('b')
}, 0)
console.log('c')
Promise.resolve()
    .then(() => {
        console.log('f')
    })
    .then(() => {
        console.log('g')
    })
new Promise(resolve => {
    console.log('d')
    resolve('e')
}).then(res => {
    console.log(res)
})
console.log('h')
