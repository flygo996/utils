/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 18:03:31 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 18:35:47
 */

class MyVue {
  constructor(options) {
    const self = this;
    this.data = options.data;
    this.methods = options.methods;
    Object.keys(this.data).forEach(function (key) {
      self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
  }

  // 把vm.data.xx挂载到vm，这样就可以直接通过vm.xx来访问数据
  proxyKeys(key) {
    const self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get() {
        return self.data[key];
      },
      set(newVal) {
        self.data[key] = newVal;
      }
    });
  }
}
