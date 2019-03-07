/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 09:20:36 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 09:28:52
 */
// es3
function Person(name) {
  this.name = name;
}
Person.prototype.printName = function () {
  console.log(this.name);
}

function Bob() {
  Person.call(this, 'Bob');
  this.hobby = 'Histroy';
}

function inheritProto(Parent, Child) {
  var Fn = function () { };
  Fn.prototype = Person.prototype;
  Child.prototype.constructor = Child;
}

inheritProto(Person, Bob);

Bob.prototype.printHobby = function () {
  console.log(this.hobby);
}

console.dir(new Bob()); // Bob { name: 'Bob', hobby: 'Histroy' }