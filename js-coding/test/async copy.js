// 输出以下代码的顺序
async function async1() {
  console.log("async1 start")
  await async2()
  console.log("async1 end")
}

async function async2() {
  console.log("async2 start")
  await async3()
  console.log("async2 end")
}

async function async3() {
  console.log("async3")
}

console.log("script start")

setTimeout(function() {
  console.log("setTimeout 100")
}, 100)

setTimeout(function() {
  console.log("setTimeout 0")
}, 0)

async1()

console.log("script end")

// script start
// async1 start
// async2 start
// async3
// script end
// async2 end
// async1 end
// setTimeout 0
// setTimeout 100
