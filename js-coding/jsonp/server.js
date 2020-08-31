let express = require('express')
let app = express()
app.get('/', function(req, res) {
    let { a, b, callback } = req.query
    console.log(a) // 1
    console.log(b) // 2
    // 注意哦，返回给script标签，浏览器直接把这部分字符串执行
    res.end(`${callback}('数据包')`)
})
app.listen(3000)
