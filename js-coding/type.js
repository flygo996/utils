const a = {
    value: 0,
    valueOf: function() {
        this.value++
        return this.value
    },
}
console.log(a == 1 && a == 2) // true 【因为会隐式转换】
console.log(a === 1 && a === 2) // false [类型不一样，直接返回flase]


// 对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
// 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true
