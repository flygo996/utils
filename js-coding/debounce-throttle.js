/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait = 200, immediate = false) {
    let timeout
    return function(...args) {
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) func.apply(this, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait = 200, type = 1) {
    let previous = 0
    let timeout
    return function(...args) {
        if (type === 1) {
            let now = Date.now()
            if (now - previous > wait) {
                func.apply(this, args)
                previous = now
            } 
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null
                    func.apply(this, args)
                }, wait)
            }
        }
    }
}
