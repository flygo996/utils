/*
 * @Author: laifeipeng 
 * @Date: 2019-02-20 10:00:36  
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-23 20:42:57
 */

/********* 1、冒泡排序 **********/
// 很常见很容易理解的排序算法， 排序思路：遍历数组，每次遍历就将最大（或最小）值推至最前。越往后遍历查询次数越少
const bubbleSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (list[j] < list[j - 1]) {
        [list[j - 1], list[j]] = [list[j], list[j - 1]];
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
        [list[j - 1], list[j]] = [list[j], list[j - 1]];
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
      [list[k], list[i]] = [list[i], list[k]];
    }
  }
  return list;
}

/********* 4、直接插入排序 **********/
// 每次选择无序区第一个元素插入到有序区，并排序
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

/********* 5、二分插入排序 **********/
// 插入排序的一种优化实现， 通过二分法减少遍历时间（以前是从某边开始依次比较，现在从中间开始比较，减少比较次数）
// 注意，数组很大才能提现二分插入的优势
const insertSort2 = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  for (let i = 1; i < len; i++) {
    const tmp = list[i];
    let low = 0;
    let high = i - 1;
    let j = i - 1;
    while (low <= high) {
      const mid = ~~((low + high) / 2);
      if (tmp < list[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    while (j > high) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = tmp;
  }
  return list;
}


/********* 6、快速排序 **********/
const quickSort1 = arr => {
  const list = arr.slice(); //为了保证这个函数是纯函数，拷贝一次数组
  if (list.length <= 1) return list;
  const pivot = list.splice(0, 1)[0]; //选第一个作为基数，并把基数从数组里面删除
  const left = [];
  const right = [];
  for (let i = 0, len = list.length; i < len; i++) { //从0开始
    if (list[i] < pivot) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 上面const pivot = list.splice(0, 1)[0]; 如果想直接改为list[0],那么后面循环的时候要从i=1开始
const quickSort2 = arr => {
  const list = arr.slice(); //为了保证这个函数是纯函数，拷贝一次数组
  if (list.length <= 1) return list;
  const pivot = list[0]; //选第一个作为基数
  const left = [];
  const right = [];
  for (let i = 1, len = list.length; i < len; i++) { //从1开始
    if (list[i] < pivot) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

/********* 7、原地算法快速排序 **********/
const quickSort = arr => {
  const list = arr.slice() // 为了保证这个函数是纯函数拷贝一次数组
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
      return;
    }
    let i = left;
    let j = right;
    const baseVal = arr[j]; // 取无序数组最后一个数为基准值
    while (i < j) {         //把所有比基准值小的数放在左边大的数放在右边
      while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
        i++;
      }
      arr[j] = arr[i];    // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
        j--;
      }
      arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    sort(arr, left, j - 1); // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right); // 将右边的无序数组重复上面的操作
  }
  sort(list);
  return list;
}

/********* 8、希尔排序 **********/
// 排序思路：先将整个待排序记录序列分割成若干个子序列，在序列内分别进行直接插入排序，待整个序列基本有序时，再对全体记录进行一次直接插入排序。
const shellSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  let gap = ~~(len / 2);
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      const tmp = list[i];
      let j = i - gap;
      while (j >= 0 && tmp < list[j]) {
        list[j + gap] = list[j];
        j = j - gap;
      }
      list[j + gap] = tmp;
    }
    gap = ~~(gap / 2);
  }
  return list;
}