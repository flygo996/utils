// 要求： 改为输出顺序为 start --> cb --> end
// (async function(){

console.log("start")

async function foo(cb) {
  new Promise(async (res, rej) => {
    await setTimeout(() => {
      cb()
      res()
    }, 0)
  })
}

foo(() => console.log("cb"))

console.log("end")

// 现在输出为： start  end  cb
// })()
