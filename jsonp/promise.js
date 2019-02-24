/*
 * @Author: laifeipeng
 * @Date: 2019-02-24 11:05:45
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-24 11:43:05
 */
/**
一句话阐述下JSONP原理：
动态生成一个JavaScript标签，其src由接口url、请求参数、callback函数名拼接而成，利用js标签没有跨域限制的特性实现跨域请求。

有几点需要注意：
1.callback函数要绑定在window对象上
2.服务端返回数据有特定格式要求：callback函数名+'('+JSON.stringify(返回数据) +')'
3.不支持post，因为js标签本身就是一个get请求
*/

function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    // 1、初始化url
    let dataString = url.indexOf('?') === -1 ? '?' : '&'
    let callbackName = `jsonpCB_${Date.now()}`
    url += `${dataString}callback=${callbackName}`
    if (data) {
      // 有请求参数，依次添加到url
      for (let k in data) {
        url += `&${k}=${data[k]}`
      }
    }
    // 2、动态生成js标签
    let jsNode = document.createElement('script')
    jsNode.src = url

    // 3、触发callback，触发后删除js标签和绑定在window上的callback
    window[callbackName] = result => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      if (result) {
        resolve(result)
      } else {
        reject('没有返回数据')
      }
    }
    // 4、js加载异常的情况
    jsNode.addEventListener('error', () => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      reject('JavaScript资源加载失败')
    }, false)

    // 5、添加js节点到document上时，开始请求
    document.body.appendChild(jsNode)
  })
}
// 测试
jsonp('http://127.0.0.1:3000/jsonp', { a: 1, b: 'heiheihei' })
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })