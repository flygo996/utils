// this 永远指向最后调用它的那个对象
var a = {
    name: 'Cherry',
    fn: function(a, b) {
        console.log(a + b)
    },
}

var b = a.fn
b.apply(a, [1, 2]) // 3
b.call(a, 1, 2) // 3
b.bind(a, 1, 2)() // 3
b.bind(a, 1)(2) // 3
b.bind(a)(1, 2) // 3
console.log('-----')

// 作者：sunshine小小倩
// 链接：https://juejin.im/post/59bfe84351882531b730bac2
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Function.prototype.myApply = function(context, args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
Function.prototype.myCall = function(context, ...args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
Function.prototype.myBind = function(context, ...args1) {
    context = context || window
    context.fn = this
    return function(...args2) {
        const result = context.fn(...args1, ...args2)
        delete context.fn
        return result
    }
}

b.myApply(a, [1, 2]) //3
b.myCall(a, 1, 2) //3
b.myBind(a, 1, 2)() // 3
b.myBind(a, 1)(2) // 3
b.myBind(a)(1, 2) // 3

const myNew = function(context, ...args) {
    if (typeof context !== 'function') {
        return
    }
    const obj = {}
    obj.__proto__ = context.prototype
    const result = context.apply(obj, args) // or call(obj, ...args)
    return (typeof result === 'object' || typeof result === 'function') &&
        result !== null
        ? result
        : obj
}

const New = function(fn, ...arg) {
    if (typeof context !== 'function') {
        return
    }
    const obj = {}
    obj.__proto__ = fn.prototype
    const rst = fn.apply(obj, arg)
    return rst instanceof Object ? rst : obj
}

// 极简写法
function _new(fn, ...arg) {
    if (typeof context !== 'function') {
        return
    }
    const obj = Object.create(fn.prototype)
    const rst = fn.apply(obj, arg)
    return rst instanceof Object ? rst : obj
}

// class Person {
//     constructor(name) {
//         this.name = name
//     }
//     getName() {
//         console.log(this.name)
//     }
// }
function Person(name) {
    this.name = name
}
const p1 = new Person('p1')
console.log(p1 instanceof Person) // true

const p2 = myNew(Person, 'p2')
// console.log(p2 instanceof Person) // Class constructor Person cannot be invoked without 'new'
console.log(p2 instanceof Person) // true

function myInstanceof(left, right) {
    //基本数据类型直接返回false
    if (typeof left !== 'object' || left === null) return false
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left)
    while (true) {
        //查找到尽头，还没找到
        if (proto == null) return false
        //找到相同的原型对象
        if (proto == right.prototype) return true
        proto = Object.getPrototypeof(proto)
    }
}
