/*
 * @Author: laifeipeng 
 * @Date: 2019-02-22 14:07:42 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 20:10:07
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    alert(this.name);
  };
}

const New = function (P, ...arg) {
  const obj = {};
  obj.__proto__ = P.prototype;
  const rst = P.apply(obj, arg);
  return rst instanceof Object ? rst : obj;
}

// 极简写法
function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const rst = fn.apply(obj, arg);
  return rst instanceof Object ? rst : obj;
}

const p1 = New(Person, "Ysir", 10, "A");
const p2 = New(Person, "Sun", 20, "B");
console.log(p1.name);//Ysir
console.log(p2.name);//Sun
console.log(p1.__proto__ === p2.__proto__);//true
console.log(p1.__proto__ === Person.prototype);//true

// 与原生js的new对比
const p = new Person('laifeipeng', 20, "C");
console.log(p.name);//laifeipeng
console.log(p.__proto__ === p1.__proto__);//true
console.log(p.__proto__ === Person.prototype);//true
console.log(Person.prototype.constructor === Person);//true

// 结论--正确！


// 最后，看看Object.create()做了什么
const a = { name: 'lily', age: 20, say() { console.log('test say()') } };
const b = Object.create(a);
b.__proto__ === a; //true
a.age === b.age; //true
a.say === b.say; //true
