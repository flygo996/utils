const observerQueue = new Set();
const observe = fn => observerQueue.add(fn);
const observable = obj =>
  new Proxy(obj, {
    set(tgt, key, val, receiver) {
      console.log({ tgt, key, val, receiver });
      const result = Reflect.set(tgt, key, val, receiver);
      observerQueue.forEach(v => v());
      return result;
    },
  });

const person = observable({ age: 25, name: 'Yajun' });
const print = () => console.log(`${person.name} is ${person.age} years old`);
observe(print);
person.name = 'Joway';
// Joway is 25 years old
person.age = 18;
// Joway is 18 years old
