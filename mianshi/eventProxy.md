/*
 * @Author: laifeipeng 
 * @Date: 2019-02-24 11:36:22 
 * @Last Modified by:   laifeipeng 
 * @Last Modified time: 2019-02-24 11:36:22 
 */
 
```html
<ul id="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```

```js        
<script>
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase() === 'li') {
        console.log('the content is: ', target.innerHTML);
    }
});
</script>
```