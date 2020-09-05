// 题目描述
// 给定一棵二叉搜索树，请找出其中的第k小的结点。
// 例如， （5，3，7，2，4，6，8）
// 中，按结点数值大小顺序第三小结点的值为4。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

// 二叉树的中序遍历，二叉搜索树的中序遍历正好是升序的！
function KthNode (pRoot, k) {
  // write code here
  let arr = []
  let dfs = function (root) {
    if (root !== null) {
      dfs(root.left)
      arr.push(root)
      dfs(root.right)
    }
  }

  dfs(pRoot)
  return arr[k - 1]
}
module.exports = {
  KthNode: KthNode
}
