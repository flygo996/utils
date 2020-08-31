function fn() {
    console.log("a", a)
    var a = 1 // let a = 1
    function a() {
        console.log("I am a function")
    }
}
fn()

// 作者：西南_张家辉
// 链接：https://juejin.im/post/5e6e2a51f265da571c4cb065
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
