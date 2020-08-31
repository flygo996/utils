/**
 * 单例模式
 */

function Person(name) {
    this.name = name
}
Person.prototype.getName = function() {
    console.log(this.name)
}

function Singleton() {
    let instance = null
    return function(name) {
        if (!instance) {
            instance = new Person(name)
        }
        return instance
    }
}
const SingletonPerson = Singleton()

SingletonPerson("a").getName() // a
SingletonPerson("b").getName() // a
SingletonPerson("c").getName() // a
