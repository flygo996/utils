// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
while(line=readline()){
    var lines = line.split(" ");
    var a = parseInt(lines[0]);
    var b = parseInt(lines[1]);
    print(a+b);
}

// 本题为考试多行输入输出规范示例，无需提交，不计分。
var n = parseInt(readline());
var ans = 0;
for(var i = 0;i < n; i++){
    lines = readline().split(" ")
    for(var j = 0;j < lines.length; j++){
        ans += parseInt(lines[j]);
    }
}
print(ans);