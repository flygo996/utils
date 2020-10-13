// 分别按照二叉树先序、中序、后序打印所有的节点。
// 先序： 中左右
// 中序： 左中右
// 后序： 左右中

// 输入 {1,2,3}
// 输出 [[1,2,3],[2,1,3],[2,3,1]]
/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 *
 * @param root TreeNode类 the root of binary tree
 * @return int整型二维数组
 */
function threeOrders (root) {
  const pre = []
  const mid = []
  const post = []
  const preTraversal = root => {
    if (root === null) {
      return null
    }
    pre.push(root.val)
    preTraversal(root.left)
    preTraversal(root.right)
  }

  const midTraversal = root => {
    if (root === null) {
      return null
    }
    midTraversal(root.left)
    mid.push(root.val)
    midTraversal(root.right)
  }

  const postTraversal = root => {
    if (root === null) {
      return null
    }
    postTraversal(root.left)
    postTraversal(root.right)
    post.push(root.val)
  }
  preTraversal(root)
  midTraversal(root)
  postTraversal(root)
  return [pre, mid, post]
}

// 先序遍历--迭代解法：
/**
 * @param {TreeNode} root
 * @return {arr[]}
 */
var preOrderTraversal = function (root) {
  let stack = [root];
  let arr = [];
  while (stack.length > 0) {//循环迭代
      let node = stack.pop();
      node && arr.push(node.val); // node不为空时，向arr中推入节点值
      node && node.right && stack.push(node.right); //关键点：模拟栈，后入先出，故先压右节点
      node && node.left && stack.push(node.left); // 关键点：后入先出，后压左节点
  }
  return arr
};