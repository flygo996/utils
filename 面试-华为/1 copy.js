while ((m = readline())) {
  var lines = readline()
    .split(' ')
    .slice(0, m)
    .map(Number)
  const n = parseInt(readline())
  if(lines.length<+m){
      print('')
  }else if (n <= 0) {
    print('')
  } else {
    if (lines.length < 2 * n) {
      print(-1)
    } else {
      const arr = [...new Set(lines)].sort((a, b) => a - b)
      if (arr.length < 2 * n) {
        print(-1)
      } else {
        const min = arr.slice(0, n)
        const max = arr.slice(-n)
        const ans = [...min, ...max].reduce(
          (acc, cur) => ((acc += cur), acc),
          0
        )
        print(ans)
      }
    }
  }
}
