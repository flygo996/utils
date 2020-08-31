// 对象转原始类型
// Symbol.toPrimitive 优先级最高

var a = {
  i: 1,
  valueOf() {
    return a.i++;
  },
  toString() {
    return a.i++;
  },
  [Symbol.toPrimitive]() {
    return a.i++;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
// 汇总
var a = {
  num: 1,
  valueOf() {
    return a.num++;
  },
};
console.log(a == 1 && a == 2 && a == 3, '1-------');

var b = {
  num: 1,
  toString() {
    return b.num++;
  },
};
console.log(b == 1 && b == 2 && b == 3, '2-------');

var c = {
  num: 1,
  [Symbol.toPrimitive](h) {
    return c.num++;
  },
};
console.log(c == 1 && c == 2 && c == 3, '3-------');

var d = new Proxy(
  {},
  {
    i: 1,
    get: function () {
      return () => this.i++;
    },
  },
);
console.log(d == 1 && d == 2 && d == 3, '4-------');

var efun = {
  i: 1,
  get: function () {
    return efun.i++;
  },
};
Object.defineProperty(global, 'e', efun);
console.log(e == 1 && e == 2 && e == 3, '5-------');

var f = [1, 2, 3];
f.join = f.shift;
console.log(f == 1 && f == 2 && f == 3, '6-------');

var g = {
  i: 123,
  reg: /\d/g,
  valueOf() {
    return this.reg.exec(this.i)[0];
  },
};
console.log(g == 1 && g == 2 && g == 3, '7-------');
