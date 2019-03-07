/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 09:20:36 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 09:31:37
 */
// es3
class Person {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}

class Bob extends Person {
  constructor() {
    super('Bob');
    this.hobby = 'Histroy';
  }
  printHobby() {
    console.log(this.hobby);
  }

}

console.dir(new Bob()); // Bob { name: 'Bob', hobby: 'Histroy' }
