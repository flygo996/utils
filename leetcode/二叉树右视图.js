// 一，DFS
function dfs (root, depth, res) {
  // 当前数组长度等于深度时，把当前值加入数组
  if (root) {
    if (res.length === depth) {
      res.push(root.val)
    }
    // 先从右边开始，右边没有了才轮到左边
    root.right && dfs(root.right, depth + 1, res)
    root.left && dfs(root.left, depth + 1, res)
  }
}
function rightSideView (root) {
  if (!root) {
    return []
  }
  // 优化：上面3行可以去掉，因为下面的操作可以包含这个判断
  const res = []
  dfs(root, 0, res)
  return res
}

// 二，层序遍历，每层的最后一个
// 三，bfs