/*
 * @Author: laifeipeng 
 * @Date: 2019-02-27 11:03:02 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-27 11:52:12
 */

 class Person{
   
   constructor(name,age){
     this.name=name;
     this.age=age;
     this.publicFn();
   }
  //  静态方法(类的方法)
   static staticFn(){
     console.log('staticFn...');
   }
  //  原型方法
   publicFn(){
     console.log('publicFn...');
     console.log(this.name,this.age);
   }
 }
 const p = new Person('lfp',20);
 Person.staticFn();


 class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确