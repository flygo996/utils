/**
 * 发布订阅
 */

const Observer = {
    subscribes: [],
    subscribe(type, fn) {
        if (!this.subscribes[type]) {
            this.subscribes[type] = []
        }
        typeof fn === 'function' && this.subscribes[type].push(fn)
    },
    publish(){
        const type = [].shift.call(arguments)
        const fns = this.subscribes[type]
    }
}
