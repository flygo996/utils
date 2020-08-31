const o = {
  a: ['a1', 'a2'],
  b: ['b1', 'b2'],
  get all() {
    console.log(Object.keys(this));
    console.log(this);
    return [...this.a, ...this.b];
  },
  set lala(v) {
    console.log('set:', v);
    return v + 'yyy';
  },
  get lala() {
    return 'yyyayayyya';
  },
  all2() {
    return [...o.a, ...o.b];
  },
};

console.table(o);
console.log('1', o.all);
console.log('2', o.all2());
o.lala = '500';
console.log(o.lala);
