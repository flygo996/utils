class EventEmit {
    constructor() {
        this._events = this._events || new Map() // 存储事件/回调键值对
        this._maxListeners = this._maxListeners || 10 // 设立监听上限
    }
}
// https://juejin.im/post/5ac2fb886fb9a028b86e328c
