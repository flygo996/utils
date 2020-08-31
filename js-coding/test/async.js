// 输出以下代码的顺序
async function async1() {
  console.log("async1 start")
  await async2()
  console.log("async1 end")
}

async function async2() {
  console.log("async2")
}

console.log("script start")

setTimeout(function() {
  console.log("setTimeout")
}, 0)

async1()

console.log("script end")

// script start
// async1 start
// async2
// script end
// async1 end
// setTimeout
