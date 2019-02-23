/*
 * @Author: laifeipeng 
 * @Date: 2019-02-22 15:44:56 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-22 17:57:52
 */
/*************** 观察者模式 **************/

// 观察的主题（目标对象），相当于发布者
class Subject {
  constructor(obj) {
    this.subs = [];
    this.state = obj.length;//触发更新的状态
  }
  //新增两个对于name的操作 获取/更新
  getState() {
    return state;
  }
  setState(state) {
    if (this.state === state) {
      console.log('不能设为之前的name，无效');
      return;
    }
    this.state += state;
    this.notify(); // 有更新，触发通知！【原本手动触发通知的，现在根据数据变化来触发】
  }
  addSub(sub) {
    this.subs.push(sub);
    // console.log(this.subs)
  }
  removeSub(sub) {
    const idx = this.subs.findIndex(i => i === sub);
    if (idx === -1) {
      console.log('不存在该观察者');
      return;
    }
    this.subs.splice(idx, 1);
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update(this.state);// 与观察者原型方法update对应！
    });
  }
}

// 观察人，相当于订阅者
class Observer {
  update(v) {
    console.log(`观察到的值是${v}`)
  }
}

// 测试代码
const obj = { length: 10 };

const subject = new Subject(obj);
const ob = new Observer();
const ob2 = new Observer();
ob2.update = function () { //修改update方法，实现不同逻辑
  console.log('laifeipeng');
}

//目标添加观察者了
subject.addSub(ob);
subject.addSub(ob2);

//目标发布消息调用观察者的更新方法了
// subject.notify();
subject.setState(11);
// update
// laifeipeng

subject.removeSub(ob2); //移除之后就不触发ob2的update了，不再打印`laifeipeng`
subject.setState(22);
// 不能设为之前的name，无效
// subject.notify();
// update

const test = new Observer();
subject.removeSub(test);
// 不存在观察者：
// Observer {}