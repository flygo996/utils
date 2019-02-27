/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 17:20:18 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 18:08:29
 */

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
}
Dep.target = null;

class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }
  walk(data) {
    const self = this;
    Object.keys(data).forEach(function (key) {
      self.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(data, key, val) {
    const dep = new Dep();
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }
}

function observe(value) {
  if (!value || typeof value !== 'object') {
      return;
  }
  return new Observer(value);
};

