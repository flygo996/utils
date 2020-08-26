function Wrapper(func) {
  return function (...args) {
    const generator = func(...args);
    generator.next();
    return generator;
  };
}
const print = Wrapper(function* () {
  console.log(`First Input: ${yield}`);
  return 'done';
});
print().next('hello');
// First Input: hello
