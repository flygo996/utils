// https://leetcode-cn.com/problems/add-two-numbers/
/*
示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let add = 0
  const node = new ListNode(null)
  let ans = node
  while (l1 || l2) {
      const cur = Number(l1?l1.val:0) + Number(l2?l2.val:0) + add
      ans.next = new ListNode(cur % 10)
      ans = ans.next
      add = ~~(cur / 10)
      l1 && (l1 = l1.next)
      l2 && (l2 = l2.next)
  }
  add && (ans.next = new ListNode(add))
  return node.next
};