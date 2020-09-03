// 将两个有序的链表合并为一个新链表(也要有序)，要求新的链表是通过拼接两个链表的节点来生成的。
// eg: {1},{} ==> {1}
// eg: {1},{1} ==> {1,1}

/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 *
 * @param l1 ListNode类
 * @param l2 ListNode类
 * @return ListNode类
 */
function mergeTwoLists (l1, l2) {
  if (l1 === null && l2 === null) {
    return null
  }

  let temp1 = l1
  let temp2 = l2
  let temp3 = new ListNode(0) // 这里一定要这样写，不能写null，否则代码不能通过
  let head = temp3
  while (true) {
    if (temp1 === null) {
      temp3.next = temp2
      break
    } else if (temp2 === null) {
      temp3.next = temp1
      break
    } else if (temp1.val <= temp2.val) {
      temp3.next = temp1
      temp1 = temp1.next
      temp3 = temp3.next
    } else {
      temp3.next = temp2
      temp2 = temp2.next
      temp3 = temp3.next
    }
  }
  return head.next // //返回的是头节点的next
}
module.exports = {
  mergeTwoLists: mergeTwoLists
}
