// http://47.98.159.95/my_blog/js-async/011.html#await

async function test() {
    console.log(100)
    let x = await 200
    console.log(x)
    console.log(300)
}
console.log(0)
test()
console.log(500)

// 输出结果
// 0
// 100
// 500
// 200
// 300

// 总结一下，async/await利用协程和Promise实现了同步方式编写异步代码的效果，
// 其中Generator是对协程的一种实现，虽然语法简单，但引擎在背后做了大量的工作，
// 我们也对这些工作做了一一的拆解。
// 用async/await写出的代码也更加优雅、美观，
// 相比于之前的Promise不断调用then的方式，语义化更加明显，
// 相比于co + Generator性能更高，上手成本也更低，不愧是JS异步终极解决方案！
