function push (node) {
  // write code here
  return Array.prototype.unshift.call(this, node)
}
function pop () {
  // write code here
  return Array.prototype.pop.call(this)
}
module.exports = {
  push: push,
  pop: pop
}
