async function test() {
    let arr = [4, 2, 1]
    arr.forEach(async item => {
        const res = await handle(item)
        console.log(res)
    })
    console.log('结束')
}

function handle(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x)
        }, 1000 * x)
    })
}

test()
// 结束
// 1
// 2
// 4

// http://47.98.159.95/my_blog/js-async/012.html#%E8%A7%A3%E5%86%B3%E5%8E%9F%E7%90%86%E2%80%94%E2%80%94iterator
// 其实也很简单, 我们利用for...of就能轻松解决。
async function test2() {
    let arr = [4, 2, 1]
    for (const item of arr) {
        const res = await handle(item)
        console.log(res)
    }
    console.log('结束')
}

test2()
// 4
// 2
// 1
// 结束