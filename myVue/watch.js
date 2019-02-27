/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 17:50:52 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 18:43:05
 */
class Watcher {
  constructor(vm, key, cb) {
    this.cb = cb;
    this.vm = vm;
    this.key = key;           // vm.data里面的属性xxx
    this.value = this.get();  // 将自己添加到订阅器的操作
  }
  update() {
    this.run();
  }
  run() {
    const value = this.vm.data[this.key];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
  get() {
    Dep.target = this;  // 缓存自己
    const value = this.vm.data[this.key]  // 强制执行监听器里的get函数
    Dep.target = null;  // 释放自己
    return value;
  }
}
