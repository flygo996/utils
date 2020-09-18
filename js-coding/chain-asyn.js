// JavaScript 链式调用和异步处理

// 实现一个 lazyMan

// LazyMan("Hank").eat("dinner").sleepFirst(5).sleep(2).eat("supper"); 打印如下

// Hank
// ...（延迟5s）
// dinner
// ... (延迟2s)
// supper

// 作者：西南_张家辉
// 链接：https://juejin.im/post/5e6e2a51f265da571c4cb065
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

function _LazyMan(name) {
    this.nama = name
    this.queue = []
    this.queue.push(() => {
        console.log('Hi! This is ' + name + '!')
        this.next()
    })
    setTimeout(() => {
        this.next()
    }, 0)
}

_LazyMan.prototype.eat = function(name) {
    this.queue.push(() => {
        console.log('Eat ' + name + '~')
        this.next()
    })
    return this
}

_LazyMan.prototype.next = function() {
    var fn = this.queue.shift()
    fn && fn()
}

_LazyMan.prototype.sleep = function(time) {
    this.queue.push(() => {
        setTimeout(() => {
            console.log('Wake up after ' + time + 's!')

            this.next()
        }, time * 1000)
    })
    return this
}

_LazyMan.prototype.sleepFirst = function(time) {
    const L = this.queue.length
    // 加在倒数第二个（最后一个的前面）
    this.queue.splice(L - 1, 0, () => {
        setTimeout(() => {
            console.log('Wake up after ' + time + 's!')

            this.next()
        }, time * 1000)
    })
    return this
}

function LazyMan(name) {
    return new _LazyMan(name)
}

LazyMan('Hank')
    .eat('dinner')
    .sleepFirst(5)
    .sleep(2)
    .eat('supper')

// Hi! This is Hank!
// Wake up after 5s!
// Eat dinner~
// Wake up after 2s!
// Eat supper~
