/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 17:50:52 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 17:53:22
 */
class Watcher {
  constructor(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // 将自己添加到订阅器的操作
  }
  update() {
    this.run();
  }
  run() {
    const value = this.vm.data[this.exp];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
  get() {
    Dep.target = this;  // 缓存自己
    const value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
    Dep.target = null;  // 释放自己
    return value;
  }
}
