// http://47.98.159.95/my_blog/js-base/006.html#%E7%AC%AC%E5%9B%9B%E7%A7%8D-%E7%BB%84%E5%90%88%E7%BB%A7%E6%89%BF%E7%9A%84%E4%BC%98%E5%8C%961

// 寄生组合继承
function Parent5() {
    this.name = 'parent5'
    this.play = [1, 2, 3]
}
function Child5() {
    Parent5.call(this)
    this.type = 'child5'
}
Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5
