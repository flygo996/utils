// 输入一个链表，反转链表后，输出新链表的表头。

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList (head) {
  if (head === null) {
    return null
  }
  let pre = null
  let next = null

  while (head !== null) {
    next = head.next
    head.next = pre
    pre = head
    head = next
  }
  return pre
}
