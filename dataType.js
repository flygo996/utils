
/**
 * 类型判断（一）：精简、技巧
 */
const dataType = ['Number', 'String', 'Function', 'Boolean', 'Object', 'Array', 'Date'];
const DataType = {};
for (let i = 0; i < dataType.length; i++) {
  /* eslint-disable */
  DataType['is' + dataType[i]] = ((_type) => {
    return (_data) => ({}.toString.call(_data) === '[object ' + _type + ']');

  })(dataType[i]);
}

/**
 * 类型判断（二）：直接、明了
 */
export default class DataType2 {
  static isString(o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  }
  static isNumber(o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  }
  static isObj(o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  }
  static isEmptyObj(o) { //是否空对象
    return JSON.stringify(o) === '{}'
  }
  static isEmptyArray(o) { //是否空数组
    return JSON.stringify(o) === '[]'
  }
  static isArray(o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  }
  static isDate(o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  }
  static isBoolean(o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  }
  static isFunction(o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  }
  static isNull(o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  }
  static isUndefined(o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  }
  static isFalse(o) {
    return (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN')
  }
  static isTrue(o) {
    return !this.isFalse(o)
  }
}
