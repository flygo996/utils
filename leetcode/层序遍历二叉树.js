// 层序遍历二叉树
// https://www.jianshu.com/p/410a213c781d
/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
function print (pRoot) {
  if (!pRoot) {
    return []
  }
  const queue = [pRoot] //将根节点加入到队列中
  const result = [] //结果数组
  while (queue.length) {
    const len = queue.length //队列中长度循环一次就得变一次
    const tempArr = [] //存储每层节点值的临时数组，方便一层层打印
    for (let i = 0; i < len; i++) {
      //遍历每层节点
      const temp = queue.shift()
      tempArr.push(temp.val)
      if (temp.left) {
        queue.push(temp.left)
      }
      if (temp.right) {
        queue.push(temp.right)
      }
    }
    result.push([...tempArr])
  }
  return result
}
