/*
 * @Author: laifeipeng 
 * @Date: 2019-03-19 00:16:24 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2022-08-11 12:01:57
 */
/*
作者：尹光耀
链接：https://juejin.im/post/5c8f30606fb9a070ef60996d
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/

/************ 实现下面mechine函数 *******************
function machine() {

}
machine('ygy').execute()
// start ygy
machine('ygy').do('eat').execute();
// start ygy
// ygy eat
machine('ygy').wait(5).do('eat').execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat

*************************************************/


// --------------------实现如下----------------

const defer = (time, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback())
    }, time * 1000)
  })
}
class QueueItem {
  constructor(defer, callback) {
    this.defer = defer;
    this.callback = callback;
  }
}
class Action {
  constructor(name) {
    this.queue = []
    this.name = name;
    this.queue.push(new QueueItem(0, () => console.log(`start ${this.name}`)))
  }
  do(eat) {
    this.queue.push(new QueueItem(0, () => console.log(`${this.name} ${eat}`)))
    return this;
  }
  wait(time) {
    this.queue.push(new QueueItem(time, () => console.log(`wait ${time}s`)))
    return this;
  }
  waitFirst(time) {
    this.queue.unshift(new QueueItem(time, () => console.log(`wait ${time}s`)))
    return this;
  }
  async execute() {
    while (this.queue.length > 0) {
      const curItem = this.queue.shift();
      if (!curItem.defer) {
        curItem.callback();
        continue;
      }
      await defer(curItem.defer, curItem.callback)
    }
  }
}
function machine(name) {
  return new Action(name)
}

machine('ygy').execute()
// start ygy
machine('ygy').do('eat').execute();
// start ygy
// ygy eat
machine('ygy').wait(5).do('eat').execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat

// *****************测试结果：全部通过！****************
