/*
 * @Author: laifeipeng 
 * @Date: 2019-02-17 18:27:19 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-22 14:33:12
 */

// 优先级由高到低：小括号(xxx) ---> 属性访问.  ---> new foo() ----> foo()
function Foo() {
  getName = function () { alert(1); };
  return this;
}
Foo.getName = function () { alert(2); };
Foo.prototype.getName = function () { alert(3); };
var getName = function () { alert(4); };
function getName() { alert(5); }
//请写出以下输出结果：
Foo.getName(); //2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); //2 相当于 new (Foo.getName)();
new Foo().getName(); // 3 相当于 (new Foo()).getName()
new new Foo().getName(); // 3 相当于 new ((new Foo()).getName)()

