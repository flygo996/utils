// 要求： 改为输出顺序为 start --> cb --> end
console.log("start")

function foo(cb) {
  setTimeout(() => cb(), 0)
}

foo(() => console.log("cb"))

console.log("end")


// 现在输出为： start  end  cb