// 合并 k 个已排序的链表并将其作为一个已排序的链表返回。分析并描述其复杂度。 
/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 
 * @param lists ListNode类一维数组 
 * @return ListNode类
 */
function mergeKLists( lists ) {
  // write code here

}
module.exports = {
  mergeKLists : mergeKLists
};


// 归并排序算法的时间复杂度是o(nlogn)
// public class Solution {
//     public ListNode mergeKLists(ArrayList<ListNode> lists) {
//        if(lists==null||lists.size()==0){
//            return null;
//        }
//        return mergeKList(lists,0,lists.size()-1);
//     }
//     public ListNode mergeKList(ArrayList<ListNode> lists,int lo,int hi){
//         if (hi<=lo) return lists.get(lo);
//         int mid=lo+(hi-lo)/2;
//         ListNode left = mergeKList(lists,lo,mid);
//         ListNode right = mergeKList(lists,mid+1,hi);
//         return merge(left,right);
//     }
//     public ListNode merge(ListNode left,ListNode right){
//         ListNode h = new ListNode(-1);
//         ListNode tmp=h;
//         while(left!=null&&right!=null){
//             if(left.val<right.val){
//    		tmp.next=left;
//                 //tmp=tmp.next;
//                 left=left.next;
//             }else{
//                 tmp.next=right;
//                // tmp=tmp.next;
//                 right=right.next;
//             } tmp=tmp.next; }
//         if(left!=null){
           
//             tmp.next=left;
//         }
//         if(right!=null){
//             tmp.next=right;
//         }
//         return h.next;
//     }
// }