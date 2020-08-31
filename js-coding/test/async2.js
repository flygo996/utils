async function demoAsync() {
  console.log("begin async")

  //   await setTimeout(() => {
  //     console.log("await coming ")
  //   }, 2000)
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("await coming ")

      resolve("ok")
    }, 2000)
  })

  console.log("await is end  ,now turn me")
}

;(async function() {
  console.log(111)
  await demoAsync()
  console.log(222)
})()
