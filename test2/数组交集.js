/* 给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。*/
const a = [1, 2, 2, 1];
const b = [2, 3, 2];
function union(arr1, arr2) {
  return arr1.filter(item => {
    return arr2.indexOf(item) > -1;
  });
}
console.log(union(a, b)); // [2, 2]
const a2 = [NaN, 1, 2, 2, 1];
const b2 = [NaN, 3, 2, 1];
console.log(union(a2, b2)); // [ 1, 2, 2, 1 ] // !答案不对！

// 这样可以解决NaN的问题！
function union2(arr1, arr2) {
  return arr1.filter(item => {
    return arr2.includes(item);
  });
}
console.log(union2(a2, b2)); // [ NaN, 1, 2, 2, 1 ] // !答案不对+1！
//
function interSection(a, b) {
  var sub1 = a.filter(i => b.includes(i));
  var sub2 = b.filter(i => a.includes(i));
  return sub1.length > sub2.length ? sub2 : sub1;
}
console.log('---');
console.log(interSection([1, 2, 2, 1], [2, 2])); //[2, 2]
console.log(interSection([1, 2, 2, 1], [2])); // [2]
console.log(interSection([1, 2, 2, 1, 3], [2, 2, 1, 3])); // [2, 2, 1, 3]
console.log(interSection(a2, b2)); // [ NaN, 2, 1 ]

const aa = [1, 3, 6, 6, 7];
const bb = [4, 5, 6, 7];
const cc = [4, 6, 6, 7];
console.log(interSection(aa, bb)); // [ 6, 7 ]
console.log(interSection(aa, cc)); // [ 6, 6, 7 ]
