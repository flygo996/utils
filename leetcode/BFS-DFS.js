// https://www.jianshu.com/p/b4d8085e84bd

function deepTraversal (node, nodeList) {
  if (node) {
    nodeList.push(node)
    var children = node.children
    for (var i = 0; i < children.length; i++)
      //每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
      deepTraversal(children[i], nodeList)
  }
  return nodeList
}
// var root = document.getElementById('root')
// console.log(deepTraversal(root,nodeList=[]))

function deepTraversal (node) {
  var nodeList = []
  if (node) {
    var stack = []
    stack.push(node)
    while (stack.length != 0) {
      var childrenItem = stack.pop()
      nodeList.push(childrenItem)
      var childrenList = childrenItem.children
      for (var i = childrenList.length - 1; i >= 0; i--)
        stack.push(childrenList[i])
    }
  }
  return nodeList
}
// var root = document.getElementById('root')
// console.log(deepTraversal(root))

/*
广度优先遍历二叉树，也就是按层次的去遍历。依次遍历根节点，然后是左孩子和右孩子。
所以要遍历完当前节点的所有孩子，。根据左右孩子的顺序来输出，所以就是先进先出的原则，那么我们当然就想到了队列这个数据结构：

作者：一只程序员
链接：https://www.jianshu.com/p/b4d8085e84bd
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
function wideTraversal (node) {
  var nodes = []
  if (node != null) {
    var queue = []
    queue.unshift(node)
    while (queue.length != 0) {
      var item = queue.shift()
      nodes.push(item)
      var children = item.children
      for (var i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return nodes
}
// var root = document.getElementById('root');
// console.log(wideTraversal(root));

/* 
创建 BFS 步骤
(1) 创建一个队列Q。
(2) 将v标注为被发现的（灰色），并将v入队列Q。
(3) 如果Q非空，则运行以下步骤：
  (a) 将u从Q中出队列；
  (b) 将标注u为被发现的（灰色）；
  (c) 将u所有未被访问过的邻点（白色）入队列；
  (d) 将u标注为已被探索的（黑色）。
*/

this.bfs = function (v, callback) {
  var color = initializeColor(), //初始化所有节点的颜色信息是白色
    queue = new Queue() //存储待访问和待探索的顶点
  queue.enqueue(v) //起始定点  直接入队
  while (!queue.isEmpty()) {
    //队列非空
    var u = queue.dequeue(), //操作队列，从中移除一个顶点
      neighbors = adjList.get(u) //取得包含所有邻点的邻接表
    color[u] = 'grey' // 表示已经访问但未探索
    for (var i = 0; i < neighbors.length; i++) {
      // 对u的每个邻点
      var w = neighbors[i] // 取值
      if (color[w] === 'white') {
        // 如果没有进行访问
        color[w] = 'grey' // 标记访问
        queue.enqueue(w) // 将该顶点加入队列中
      }
    }
    color[u] = 'black' // 已经访问并已经探索完成
    if (callback) {
      // 回调函数...
      callback(u)
    }
  }
}

