/*
 * @Author: laifeipeng 
 * @Date: 2019-02-19 15:00:36 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-20 09:19:36
 */

/********* 0、准备工作 **********/
// 0-1、生成数组
const genArr = length => Array.from({ length }, () => ~~(Math.random() * 100));
const arr = genArr(6);
// 彩色打印
const padZero = n => n < 10 ? ` ${n}` : `${n}`; //因为生成的数组不超过100，最多2位数
const arrStr = arr => arr.length && arr.reduce((acc, item) => acc + '    ' + padZero(item))
const logTitle = str => console.log(`%c -------------- ${str} -------------- `, 'color:green');
const logArr = arr => console.log(`%c 初始数组 ： ${arrStr(arr)} `, 'color:blue');
const logArr2 = arr => console.log(`%c 排序后数组: ${arrStr(arr)} `, 'color:red');
const logStep = (i, leftArr, rightArr) => console.log(`%c 第${i}趟排序：%c ${arrStr(leftArr)}    %c${arrStr(rightArr)} `, 'color:green', 'color:red', 'color:blue');
const logQuickSort = (leftArr, pivot, rightArr) => console.log(`%c 递归排序：%c ${arrStr(leftArr)}    %c${pivot}    %c${arrStr(rightArr)} `, 'color:green', 'color:red', 'color:yellow', 'color:blue');


/********* 1、冒泡排序 **********/
const bubbleSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  logTitle('1、冒泡排序')
  logArr(list)
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (list[j] < list[j - 1]) {
        const tmp = list[j - 1];
        list[j - 1] = list[j];
        list[j] = tmp;
      }
    }
    i && logStep(i, list.slice(0, i), list.slice(i))//去除i==0
  }
  logArr2(list)
  return list;
}
bubbleSort(arr);

/********* 2、改进版冒泡排序 **********/
const bubbleSort2 = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  logTitle('2、改进版冒泡排序')
  logArr(list)
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
    i && logStep(i, list.slice(0, i), list.slice(i))//去除i==0
    !exchange && logArr2(list)
    if (!exchange) return list
  }
  logArr2(list)
  return list;
}
bubbleSort2(arr);

/********* 3、选择排序 **********/
const selectionSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  logTitle('3、选择排序')
  logArr(list)
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
    i && logStep(i, list.slice(0, i), list.slice(i))//去除i==0
  }
  logArr2(list)
  return list;
}
selectionSort(arr);

/********* 4、插入排序 **********/
const insertSort = arr => {
  const list = arr.slice(); //保证函数为纯函数
  const len = list.length;
  logTitle('4、插入排序')
  logArr(list)
  for (let i = 1; i < len; i++) {
    const tmp = list[i];
    let j = i - 1;
    while (j >= 0 && tmp < list[j]) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = tmp;
    i - 1 && logStep(i, list.slice(0, i), list.slice(i))//去除i==1
  }
  logArr2(list)
  return list;
}
insertSort(arr);

/********* 5、快速排序 **********/
logTitle('5、快速排序')
logArr(arr)
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
  left.length && right.length && logQuickSort(left, pivot, right)
  return quickSort(left).concat([pivot], quickSort(right))
}
logArr2(quickSort(arr))