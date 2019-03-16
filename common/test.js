const arrayOfRandoms = randomCeil => length => Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))

const arrOfThousand = arrayOfRandoms(100)(1000)
const arrOfMillion = arrayOfRandoms(100)(1e6)

const isEven = val => val % 2 === 0
const tripleIt = val => val * 3

const singleMapOperation = arr => arr.map(tripleIt)
const mapAndFilterOperation = arr => arr.map(tripleIt).filter(isEven)
const filterAndMapOperation = arr => arr.filter(isEven).map(tripleIt)


// const arrayOfRandoms2 = (randomCeil, length) => Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))
// console.log(arrayOfRandoms(100)(10))
// console.log(arrayOfRandoms2(100, 10))
// [ 40, 76, 90, 50, 44, 11, 12, 33, 19, 60 ]
// [ 38, 25, 59, 16, 52, 40, 28, 99, 27, 14 ]

const timeIt = (label, fn) => {
  console.time(label)
  fn()
  console.timeEnd(label)
}

timeIt('thousand - map', () => {
  singleMapOperation(arrOfThousand)
}) // thousand - map: 0.151ms

timeIt('thousand - map & filter', () => {
  mapAndFilterOperation(arrOfThousand)
}) // thousand - map & filter: 0.118ms

timeIt('million - map', () => [
  singleMapOperation(arrOfMillion)
]) // million - map: 143.927ms

timeIt('million - map & filter', () => {
  mapAndFilterOperation(arrOfMillion)
}) // million - map & filter: 174.167ms

timeIt('million - imperative', () => {
  const result = []
  arrOfMillion.forEach(val => {
    const tripled = tripleIt(val)
    if (isEven(tripled)) result.push(tripled)
  })
}) // million - imperative: 22.621ms


/*目标
const transformation = compose(map(fn1), filter(fn2), reduce(fn3))
transformation(array)
*/

// Let's first rewrite our array built-ins
// xf:transform
// acc:accumulation
const map2 = (xf, array) => {
  return array.reduce((acc, val) => {
    acc.push(xf(val))
    return acc
  }, [])
}

const filter2 = (preicate, array) => {
  return array.reduce((acc, val) => {
    if (preicate(val)) acc.push(val)
    return acc
  }, [])
}

// Let's then extract the reducers, so they can be passed in from outside
const map = xf => reducer => {
  return (acc, val) => {
    return reducer(acc, xf(val))
  }
}
const filter = predicate => reducer => {
  return (acc, val) => {
    if (predicate(val)) return reducer(acc, val)
    return acc
  }
}


const pushReducer = (acc, val) => {
  acc.push(val)
  return acc
}

const isEvenFilter = filter(num => num % 2 === 0)
const isNot2Filter = filter(num => num !== 2)
const doubleMap = map(num => num * 2)

const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const res1 = testArr.reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), [])


const compose = (...fns) => fns.reduce((acc, fn) => (...args) => acc(fn(...args)), x => x)


const res2 = testArr.reduce(compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer), [])


// xf:transform
// acc:accumulation
const transduce = (xf, reducer, collection, initial = []) => {
  const transformReducer = xf(reducer)
  let acc = initial
  for (const val of collection) {
    acc = transformReducer(acc, val)
  }
  return acc
}

const res3 = transduce(compose(isNot2Filter, isEvenFilter, doubleMap), pushReducer, testArr)


console.log(res1) //[ 8, 12, 16, 20 ]
console.log(res2) //[ 8, 12, 16, 20 ]
console.log(res3) //[ 8, 12, 16, 20 ]
// 结果一致，说明可行！！

// 再看时间：
timeIt('res1', () => testArr.reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []))
timeIt('res2', () => testArr.reduce(compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer), []))
timeIt('res3', () => transduce(compose(isNot2Filter, isEvenFilter, doubleMap), pushReducer, testArr))
// res1: 0.037ms
// res2: 0.038ms
// res3: 0.054ms


timeIt('res1', () => arrOfMillion.reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []))
timeIt('res2', () => arrOfMillion.reduce(compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer), []))
timeIt('res3', () => transduce(compose(isNot2Filter, isEvenFilter, doubleMap), pushReducer, arrOfMillion))
// res1: 44.540ms
// res2: 46.036ms
// res3: 55.735ms

const arrOf10Million = arrayOfRandoms(100)(1e7)
timeIt('res1', () => arrOf10Million.reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []))
timeIt('res2', () => arrOf10Million.reduce(compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer), []))
timeIt('res3', () => transduce(compose(isNot2Filter, isEvenFilter, doubleMap), pushReducer, arrOf10Million))
// res1: 422.630ms
// res2: 464.894ms
// res3: 496.700ms

// 测试居然发现，新方法并没有减少时间，好奇怪！！
// 后来才发现，是对比错了，应该要在没有提取reducer之前看看最原始的时间

const isNot2 = v => v !== 2
const doubleIt = v => v * 2
const original = arr => arr.filter(isNot2).filter(isEven).map(doubleIt)

timeIt('res0', () => original(testArr))
timeIt('res0', () => original(arrOfMillion))
timeIt('res0', () => original(arrOf10Million))
/* 第一次
res0: 0.083ms
res1: 0.049ms
res2: 0.046ms
res3: 0.044ms

res0: 139.423ms
res1: 50.007ms
res2: 51.436ms
res3: 53.681ms

res0: 1252.917ms
res1: 441.557ms
res2: 465.522ms
res3: 519.670ms
*/

/* 第二次
res0: 0.100ms
res1: 0.053ms
res2: 0.050ms
res3: 0.040ms

res0: 135.183ms
res1: 49.990ms
res2: 52.029ms
res3: 60.388ms

res0: 1264.401ms
res1: 461.523ms
res2: 448.983ms
res3: 506.073ms
*/

// 可以看出，有很明显的效率，时间只用原来的1/3~1/2
