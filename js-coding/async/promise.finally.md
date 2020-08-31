// 实现 Promise.finally
// finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作，使用方法如下：

````js
Promise
	.then(result => { ··· })
	.catch(error => { ··· })
	.finally(() => { ··· })
```// finally 特点：

// 不接收任何参数。
// finally 本质上是 then 方法的特例。

```js
Promise.prototype.finally = function(callback) {
    let P = this.constructor
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason =>
            P.resolve(callback()).then(() => {
                throw reason
            }),
    )
}
````

// 作者：三毛丶
// 链接：https://juejin.im/post/5a9b8417518825558251ce15
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
