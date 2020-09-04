/*
题解
题目描述：给定一颗二叉树，从左到右从上到下打印二叉树。

方法：队列
层次遍历打印二叉树，用队列实现。
有一句话，我觉得说的特别好：做题=解法+模板，意思就是说，对于一道题目，首先明白正确的解法已经解决该问题70%，剩下的就直接套模板。
所以BFS的模板为：
*/
// 1.如果不需要确定当前遍历到了哪一层，模板如下：
void bfs() {
  vis[] = {0}; // or set
  queue<int> pq(start_val);
 
  while (!pq.empty()) {
      int cur = pq.front(); pq.pop();
      for (遍历cur所有的相邻节点nex) {
          if (nex节点有效 && vis[nex]==0){
              vis[nex] = 1;
              pq.push(nex)
          }
      } // end for
  } // end while
 }
//  上述是伪代码，不仅可用于二叉树，可针对所有用BFS解题。

// 2.如果需要确定遍历到哪一层，模板如下；
void bfs() {
  int level = 0;
  vis[] = {0}; // or set
  queue<int> pq(original_val);
  while (!pq.empty()) {
      int sz = pq.size();
 
      while (sz--) {
              int cur = pq.front(); pq.pop();
          for (遍历cur所有的相邻节点nex) {
              if (nex节点有效 && vis[nex] == 0) {
                  vis[nex] = 1;
                  pq.push(nex)
              }
          } // end for
      } // end inner while
      level++;
 
  } // end outer while
 }

//  所以此题可直接套用模板，代码如下：

class Solution {
  public:
      vector<vector<int> > Print(TreeNode* pRoot) {
          vector<vector<int>> ret;
          queue<TreeNode*> q;
          q.push(pRoot);
  
          while (!q.empty()) {
              int sz = q.size();
              vector<int> ans;
              while (sz--) {
                  TreeNode *node = q.front();
                  q.pop();
                  ans.push_back(node->val);
  
                  if (node->left) q.push(node->left);
                  if (node->right) q.push(node->right);
              }
              ret.push_back(ans):
          }
          return ret;
      }
  
  };