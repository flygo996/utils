const menu = [
  { Id: 1, ParentId: null, Sort: 0, Name: '菜单1' },
  { Id: 2, ParentId: 1, Sort: 0, Name: '菜单1-1' },
  { Id: 3, ParentId: 1, Sort: 1, Name: '菜单1-2' },
  { Id: 4, ParentId: 2, Sort: 2, Name: '菜单1-1-2' },
  { Id: 5, ParentId: 2, Sort: 1, Name: '菜单1-1-1' },
  { Id: 6, ParentId: null, Sort: 1, Name: '菜单2' },
  { Id: 7, ParentId: 6, Sort: 0, Name: '菜单2-1' },
  { Id: 8, ParentId: 6, Sort: 1, Name: '菜单2-2' },
  { Id: 9, ParentId: 8, Sort: 2, Name: '菜单2-2-2' },
  { Id: 10, ParentId: 8, Sort: 1, Name: '菜单2-2-1' },
  { Id: 11, ParentId: 10, Sort: 0, Name: '菜单2-2-1-1' }
]

function arrToTree (list = []) {
  // 深拷贝
  const arr = JSON.parse(JSON.stringify(list))
  const result = []
  const map = {}
  arr.forEach(item => {
    map[item.Id] = item
  })
  arr.forEach(item => {
    const parent = map[item.ParentId]
    console.log('\nitem', item)
    console.log('parent 前', parent)
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
      console.log('parent 后', parent)
    } else {
      result.push(item)
    }
  })
  return result
}
console.log(JSON.stringify(arrToTree(menu), null, 2))
