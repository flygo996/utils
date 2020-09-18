/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
  let left = 1
  let right = Math.max(...piles)
  const canEat = (piles, speed, H) => {
    let sumTime = 0
    for (let pile of piles) {
      // 向上取整
      sumTime += Math.ceil(pile / speed)
    }
    return sumTime <= H
  }
  while (left < right) {
    let mid = Math.floor((right + left) / 2)
    if (canEat(piles, mid, H)) {
      right = mid // 如果能吃完，则最大值调整为mid
    } else {
      left = mid + 1 // 如果不能吃完，则最小值调整为mid + 1
    }
  }
  return right
}

// 作者：gallant-meitnervqv
// 链接：https://leetcode-cn.com/problems/koko-eating-bananas/solution/875-ai-chi-xiang-jiao-de-ke-ke-er-fen-fa-by-gallan/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
