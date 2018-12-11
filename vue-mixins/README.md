# /\*_2018-07-30_/

## 总览

按照后台管理系统功能划分（CRUD），分为 common、cud、mulDel.
1、common 部分包括 CRUD 中的 R、共有的查询、分页及 table 的 t。
2、cud 分别代表 CRUD 中的 create、update、delete。
3、mulDel 代表多选删除。

这样的话可以减少页面的代码量，不过页面上需要使用约定的函数名及变量名！

## 约定

````javascript
url: {
  getData: "/custPhoneInfoService/list",
  update: "/custPhoneInfoService/update",
  delete: "/custPhoneInfoService/deleteById",
  create: "/custPhoneInfoService/create",
  mulDel: "/custPhoneInfoService/mulDelete" // 注意返回去的是id的数组['asb','sdf']
}
````

## mixin用法

vue实例中:【common是必须的】
mixins:[ common ]
mixins:[ common, cud ]
mixins:[ common, cud, mulDel ]

## mixin合并

数据对象合并【data(一层属性深度浅合并)】：多个合并在一起，有冲突的以组件数据优先；
钩子函数合并【created、mounted等】：多个合在一起，先调用mixin的再调用组件本身的；【混为同一个数组，所以都被调用】
对象选项合并【methods、components、directives】：mixin的会被vm实例的对应项覆盖。【混为同一个对象，所以键有冲突时只选一个】

## 实例--demo2
