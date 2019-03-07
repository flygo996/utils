/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 09:20:36 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 09:29:27
 */
// es5
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


Bob.prototype = Object.create(Person.prototype, {
  constructor: {
    value: Bob,
    enumerable: false,
    configurable: true,
    writable: true
  }
})

Bob.prototype.printHobby = function () {
  console.log(this.hobby);
}

console.dir(new Bob()); // Bob { name: 'Bob', hobby: 'Histroy' }