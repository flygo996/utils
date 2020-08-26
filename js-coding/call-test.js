// this.a.b() vs this.a.b.call(this)
const a = {
    b() {
        console.log(this)
        console.log('b')
    },
    c: {
        d() {
            console.log(this)
            console.log('d')
        },
    },
}
console.log(a.b()) // Object {b: , c: Object} /n b
console.log(a.c.d()) // Object {d: } /n d
console.log(a.c.d.call(a)) // Object {b: , c: Object} /n d
