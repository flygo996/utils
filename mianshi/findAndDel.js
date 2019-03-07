/*
 * @Author: laifeipeng 
 * @Date: 2019-03-06 18:31:39 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 16:16:24
 */

// 并集
const union = (a, b) => [...new Set([...a, ...b])]
// 交集
const intersection = (a, b) => [...new Set(a)].filter(v => b.includes(v))
// 差集
const difference = (a, b) => [...new Set([...a, ...b])].filter(v => a.includes(v) && !b.includes(v))

const arr1 = [1, 2, 3];
const arr2 = [2, 4, 5];
console.log(union(arr1, arr2));         // [ 1, 2, 3, 4, 5 ]
console.log(intersection(arr1, arr2));  // [ 2 ]
console.log(difference(arr1, arr2));    // [ 1, 3 ]


// 写一个函数，去掉a数组中和b数组中相同的元素。
function array_diff(a, b) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i] == b[j]) {
        a.splice(a.indexOf(b[j]), 1); //删除
        j = -1;  //必须保证a中的每一个元素都从b的第一个元素开始遍历
      }
    }
  }
  return a;
}

function array_diff2(a, b) {
  for (var i = 0; i < b.length; i++) {
    for (var j = 0; j < a.length; j++) {
      if (a[j] == b[i]) {
        a.splice(j, 1);
        j = j - 1;  //保证a中从删除后的元素开始继续遍历
      }
    }
  }
  return a;
}
// 通过给数组b的元素加一个键(true)来判断。
function array_diff3(a, b) {
  var temp1 = []; //临时数组1
  var temp2 = []; //临时数组2

  for (var i = 0; i < b.length; i++) {
    temp1[b[i]] = true; //巧妙地方：把数组B的值当成临时数组1的键并赋值为真
    //console.log(temp1);
  };

  for (var i = 0; i < a.length; i++) {
    if (!temp1[a[i]]) {
      temp2.push(a[i]);
      // 巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，
      // 如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
    };
  };
  return temp2;
}

// 我的方法
function array_diff4(a, b) {
  return [...new Set([...a, ...b])].filter(v => a.includes(v) && !b.includes(v))
}

var a = ["c", "a", "b", "a", "d"];
var b = ["a", "b"];
console.log(array_diff(a, b));  // [ 'c', 'd' ]
console.log(array_diff2(a, b)); // [ 'c', 'd' ]
console.log(array_diff3(a, b)); // [ 'c', 'd' ]
console.log(array_diff4(a, b)); // [ 'c', 'd' ]


// 1、找到提供的句子中最长的单词，并计算它的长度。【假设只有1个】
function findLongestWord(str) {
  // 转化成数组，并对数组中每个元素的字符串长度进行比较，按照字符串长度由大至小排列数组顺序。
  const arr = str.split(" ").sort(function (a, b) {
    return b.length - a.length;
  });
  //取出数组中第一个元素(也就是最大长度的字符串）的长度，并返回
  return arr[0].length;
}

findLongestWord("The quick brown fox jumped over the lazy dog");  //结果：6

// 2\确保字符串的每个单词首字母都大写，其余部分小写。
function titleCase(str) {
  return str.toLowerCase().split(" ").map((item) => {
    return item.replace(item.charAt(0), item[0].toUpperCase())
  }).join(" ")
}
titleCase("I'm a little tea pot");  //结果：I'm A Little Tea Pot

// 3\右边大数组中包含了4个小数组，分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新数组。
function largestOfFour(arr) {
  var newArr = [];
  for (i = 0; i < arr.length; i++) {
    arr[i].sort(function (a, b) {
      return b - a;
    });

    newArr.push(arr[i][0]);
  }
  return newArr;

}
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);


// 数组中最大差值
function getMaxProfit(arr) {
  var min = arr[0],
    max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  return max - min;
}
function getMaxProfit(arr) {
  return Math.max(...arr) - Math.min(...arr);
}