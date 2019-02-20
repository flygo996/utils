const arr = [44, 92, 82, 48, 2, 51];

/********* 1、冒泡排序 **********/
// 很常见很容易理解的排序算法， 排序思路：遍历数组，每次遍历就将最大（或最小）值推至最前。越往后遍历查询次数越少
const bubbleSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (list[j] < list[j - 1]) {
        const tmp = list[j - 1];
        list[j - 1] = list[j];
        list[j] = tmp;
      }
    }
  }
  return list;
}

/********* 2、改进版冒泡排序 **********/
// 对上述冒泡排序的一种优化， 优化思路：当一次遍历前后数组不产生变化时，说明该数组已经有序，结束排序。
const bubbleSort2 = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 0; i < len; i++) {
    let exchange = false;
    for (let j = len - 1; j > i; j--) {
      if (list[j] < list[j - 1]) {
        const tmp = list[j - 1];
        list[j - 1] = list[j];
        list[j] = tmp;
        exchange = true;
      }
    }
    if (!exchange) return list
  }
  return list;
}

/********* 3、选择排序 **********/
// 在无序区中选出最小的元素，然后将它和无序区的第一个元素交换位置。
const selectionSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 0; i < len; i++) {
    let k = i
    for (let j = len - 1; j > i; j--) {
      if (list[j] < list[k]) k = j;
    }
    if (k !== i) {
      const tmp = list[k];
      list[k] = list[i];
      list[i] = tmp;
    }
  }
  return list;
}

/********* 4、插入排序 **********/
// 最普通的排序算法， 从数组下标1开始每增1项排序一次，越往后遍历次数越多；
const insertSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 1; i < len; i++) {
    const tmp = list[i];
    let j = i - 1;
    while (j >= 0 && tmp < list[j]) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = tmp;
  }
  return list;
}

/********* 5、快速排序 **********/
function quickSort(arr) {
  const list = arr.slice(); //为了保证这个函数是纯函数，拷贝一次数组
  if (list.length <= 1) return list;
  const pivot = list.splice(0, 1)[0]; //选第一个作为基数
  const left = [];
  const right = [];
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i] < pivot) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}

