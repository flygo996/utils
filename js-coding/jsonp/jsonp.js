const jsonp = ({ url, params, callbackName }) => {
    const generateURL = () => {
        let dataStr = ''
        for (let key in params) {
            dataStr += `${key}=${params[key]}&`
        }
        dataStr += `callback=${callbackName}`
        return `${url}?${dataStr}`
    }
    return new Promise((resolve, reject) => {
        // 初始化回调函数名称
        callbackName = callbackName || Math.random().toString.replace(',', '')
        // 创建 script 元素并加入到当前文档中
        let scriptEle = document.createElement('script')
        scriptEle.src = generateURL()
        document.body.appendChild(scriptEle)
        // 绑定到 window 上，为了后面调用
        window[callbackName] = data => {
            resolve(data)
            // script 执行完了，成为无用元素，需要清除
            document.body.removeChild(scriptEle)
        }
    })
}

// 调用：
jsonp({
    url: 'http://localhost:3000',
    params: {
        a: 1,
        b: 2,
    },
}).then(data => {
    // 拿到数据进行处理
    console.log(data) // 数据包
})
