// 题目描述 

//    Redraiment是走梅花桩的高手。Redraiment总是起点不限，从前到后，往高的桩子走，但走的步数最多，不知道为什么？你能替Redraiment研究他最多走的步数吗？ 

 

// 样例输入

// 6

// 2 5 1 5 4 5

 

// 样例输出

// 3


while(line=readline()){
  var n=parseInt(line);
  var arr=readline().split(' ').map(Number);
  var dp=[];
  var res=0;
  for(let i=0;i<n;i++){
      dp[i]=1;
      for(let j=0;j<i;j++){
          if(arr[j] < arr[i]){
              dp[i]=Math.max(dp[j]+1,dp[i])
          }
      }
      res=Math.max(res,dp[i])
  }
  console.log(res);
}
