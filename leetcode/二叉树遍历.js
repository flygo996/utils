// 分别按照二叉树先序，中序和后序打印所有的节点。
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
  const preTravel = root => {
    if (root === null) {
      return null
    }
    pre.push(root.val)
    preTravel(root.left)
    preTravel(root.right)
  }

  const midTravel = root => {
    if (root === null) {
      return null
    }
    midTravel(root.left)
    mid.push(root.val)
    midTravel(root.right)
  }

  const postTravel = root => {
    if (root === null) {
      return null
    }
    postTravel(root.left)
    postTravel(root.right)
    post.push(root.val)
  }
  preTravel(root)
  midTravel(root)
  postTravel(root)
  return [pre, mid, post]
}
