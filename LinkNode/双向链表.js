function DoublyLinkedList () {
  var Node = function (element) {
    this.element = element
    this.next = null //下一个是谁
    this.prev = null //上一个是谁
  }
  var head = null
  var length = 0
  var tail = 0
  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element)
      var current = head
      var index = 0
      var previous
      if (position == 0) {
        if (head == null) {
          //空链表
          head = node
          tail = node
        } else {
          head = node //新元素作为头部
          head.next = current //头部的下一个节点是旧头部
          current.prev = node //旧头部的上一个节点是新元素
        }
      } else if (position == length) {
        //尾部
        current = tail
        current.next = node //旧尾部的下一个节点 是新节点
        node.prev = current //新节点的上一个节点是旧尾部
        tail = node //更新尾部节点为新元素
      } else {
        while (index < position) {
          previous = current
          current = current.next
          index++
        } //遍历后current为当前position的节点
        node.next = current //新节点的next是current
        previous.next = node //上节点的下一个是新元素

        node.prev = previous //新元素的上个节点是previous
        current.previous = node //current的上个节点是新元素
      }
      length++
      return true
    } else {
      return false
    }
  }

  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      var current = head
      var index = 0
      var previous
      if (position == 0) {
        head = current.next //给head赋值为 下个节点，不关心其是否为null
        if (length == 1) {
          //如果长度为1  head已经为null,则将tail置为null
          tail = null
        } else {
          //head已经赋值为下个节点
          head.prev = null //head的prev置为null
        }
      } else if (position == length - 1) {
        //最后一个元素
        current = tail
        tail = current.prev
        tail.next = null
      } else {
        while (index++ < position) {
          //普通中间元素
          previous = current.prev
          current = current.next
        } //遍历后得到当前position元素
        previous.next = current.next //当前osition元素的prev指向当前postion元素的下个元素
        current.next.prev = previous //总之越过一个
      }
      length--
      return current.element
    } else {
      return null
    }
  }

  this.getLength = function () {
    return length
  }

  this.toString = function () {
    var current = head
    var string = ''
    while (current) {
      string += ',' + current.element
      current = current.next
    }
    return string
  }
}
