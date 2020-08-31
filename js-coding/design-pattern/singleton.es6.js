/**
 * 单例模式
 */

class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name)
    }
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
