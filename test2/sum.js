function sum(arr, target) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const a = target - arr[i];
    const index = arr.indexOf(a, i + 1);
    if (index >= 0) {
      res.push(i, index);
    }
  }
  return res;
}
// 当arr = [4, 7, 11, 15], target = 8的时候会有问题，结果是[0, 0]， 显然是有问题的
const arr = [4, 7, 11, 15];
console.log(sum(arr, 8)); // []
console.log(sum(arr, 11)); // [ 0, 1 ]
