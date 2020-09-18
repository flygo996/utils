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

class _LazyMan {
    constructor(name) {
        this.name = name
        this.queue = []
        this.init()
        // 异步化，让其他同步操作先执行
        // 队列加载好之后的启动开关
        setTimeout(() => {
            this.next()
        }, 0)
    }
    init() {
        this.queue.push(() => {
            console.log('Hi! This is ' + this.name + '!')
            this.next()
        })
    }
    eat(sth) {
        this.queue.push(() => {
            console.log('Eat ' + sth + '~')
            this.next()
        })
        return this
    }
    sleepFirst(time) {
        const L = this.queue.length
        this.queue.splice(L - 1, 0, () => {
            setTimeout(() => {
                console.log('Wake up after ' + time + 's!')
                this.next()
            }, time * 1000)
        })
        return this
    }
    sleep(time) {
        this.queue.push(() => {
            setTimeout(() => {
                console.log('Wake up after ' + time + 's!')
                this.next()
            }, time * 1000)
        })
        return this
    }
    next() {
        const fn = this.queue.shift()
        fn && fn()
    }
}

const LazyMan = name => new _LazyMan(name)

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
