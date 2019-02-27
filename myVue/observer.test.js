/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 17:20:18 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 18:17:35
 */
// Observer是一个数据监听器，其实现核心方法就是Object.defineProperty( )。
// 如果要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty( )处理。

function defineReactive(data, key, val) {
  observe(val); // 递归遍历所有子属性
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log(`属性${key}已经被监听，新值为“${newVal}”。`);
    }
  });
}

function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
};

// 测试
// 1、定义一个观察对象
const obj = {
  foo: {
    name: ''
  },
  bar: '',
  arr: []
};
// 2、观察该对象
observe(obj);
// 3、手动触发更新
obj.foo.name = '张三';  // 属性name已经被监听，现在值为“张三”。
obj.bar = '李四';       // 属性bar已经被监听，现在值为“李四”。
obj.arr = [1, 3, 5];    // 属性arr已经被监听，现在值为“1,3,5”。