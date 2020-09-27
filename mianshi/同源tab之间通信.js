/*
如果要实现2个同源tab页之间的数据交互，
可以选择使用localStorage，因为它的存储遵循同源策略。
通过约定localStorage某一个itemName，基于该key值的内容进行通信。
H5提供了storage事件，通过window对象监听storage事件，
会监听到localStorage的变化（包括item的增加、删除、修改），从而完成不同tab页之间的数据交互。
*/
window.addEventListener('storage', function (ev) {
  if (ev.key === 'message') {
    // removeItem也会触发storage事件，此时ev.newValue为空
    if (!ev.newValue) return
    var message = JSON.parse(ev.newValue)
    console.log(message)
  }
})
/*
属性	      含义
key	        设置或删除或修改的键。调用clear()时，则为null。
oldValue	  改变之前的旧值。如果是新增元素，则为null。
newValue	  改变之后的新值。如果是删除元素，则为null。
storageArea	该属性是一个引用，指向发生变化的sessionStorage或localStorage对象
url	        触发这个改变事件的页面的URL
*/