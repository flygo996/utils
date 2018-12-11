/**
 * 判断是否合法的日期格式，或者能否转化为合法日期
 * @param {number/string/Date} 日期，可以是时间戳、字符串或者Date实例
 * 注意：是字符串时，需要有合法的分隔符才行，没有分隔符不能解析。合法分隔符包括[-./]三种。
 * @param {Boolean} 是否合法日期
 */
function isValidDate(date) {
  // 为什么限制这么多，因为参数输入null、undefined、true、false也能被转换，但显然不对
  if (typeof date !== 'number' && typeof date !== 'string' && Object.prototype.toString.call(date).slice(8, -1) !== 'Date') {
    console.log(`Error: 输入的date的类型只能为number/string/Date类型`)
    return false
  }
  if (new Date(date).toString() === 'Invalid Date') {//这里针对乱输入的字符串
    console.log(`Error: 输入的date的类型只能为number/string/Date类型`)
    return false
  }
  return true
}

/**
 * 日期时间格式化
 * @param {number/string/Date} 日期，可以是时间戳、字符串或者Date实例
 * 注意：是字符串时，需要有合法的分隔符才行，没有分隔符不能解析。合法分隔符包括[-./]三种。
 * @param {string} 要返回的日期时间格式
 */
function dateFormat(date, pattern = 'yyyy-MM-dd hh:mm:ss') {
  if (!isValidDate(date)) {
    return `Error: 输入的date参数不合法`
  }
  //对number/string/Date类型统一转为为Date类型
  date = new Date(date)
  function padZero(s, len) {
    len = len - `${s}`.length
    for (let i = 0; i < len; i++) {
      s = '0' + s
    }
    return s
  }
  return pattern.replace(/([yMdhsm])(\1*)/g, ($0) => {
    switch ($0.charAt(0)) {
      case 'y': return padZero(date.getFullYear(), $0.length);
      case 'M': return padZero(date.getMonth() + 1, $0.length);
      case 'd': return padZero(date.getDate(), $0.length);
      case 'w': return date.getDay() + 1;
      case 'h': return padZero(date.getHours(), $0.length);
      case 'm': return padZero(date.getMinutes(), $0.length);
      case 's': return padZero(date.getSeconds(), $0.length);
    }
  })
}

/**
 * 日期时间格式化
 * @param {number/string/Date} 日期，可以是时间戳、字符串或者Date实例
 * 注意：是字符串时，需要有合法的分隔符才行，没有分隔符不能解析。合法分隔符包括[-./]三种。
 * @param {string} 要返回的日期时间格式
 */
function dateFormat2(date, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!isValidDate(date)) {
    return `Error: 输入的date参数不合法`
  }
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1,                    //月份   
    'd+': date.getDate(),                         //日   
    'h+': date.getHours(),                        //小时   
    'm+': date.getMinutes(),                      //分   
    's+': date.getSeconds(),                      //秒   
    'q+': Math.floor((date.getMonth() + 3) / 3),  //季度   
    'S': date.getMilliseconds()                   //毫秒   
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? o[k]
        : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

/**
 * 友好日期时间格式化
 * @param {number/string/Date} 日期，可以是时间戳、字符串或者Date实例
 * 注意：是字符串时，需要有合法的分隔符才行，没有分隔符不能解析。合法分隔符包括[-./]三种。
 * @param {string} 要返回的日期时间格式，或者友好中文字词
 * friendlyTime(Date.now())=>"刚刚"
 * friendlyTime(Date.now()-1000*60)=>"1分钟前"
 * friendlyTime(Date.now()-1000*60*30)=>"30分钟前"
 */
function friendlyTime(date) {
  if (!isValidDate(date)) {
    return `Error: 输入的date参数不合法`
  }
  date = new Date(date)
  const diff = Date.now() - date.getTime()
  if (diff < 0) return '输入的日期有误，居然比当前时间还晚！'
  if (diff < 1000 * 3) return '刚刚'
  if (diff < 1000 * 60) return ~~(diff / 1000) + '秒钟前'
  if (diff < 1000 * 60 * 60) return ~~(diff / (1000 * 60)) + '分钟前'
  if (diff < 1000 * 60 * 60 * 24) return Math.floor(diff / (1000 * 60 * 60)) + '小时钟前'
  if (diff < 1000 * 60 * 60 * 24 * 3) return Math.floor(diff / (1000 * 60 * 60 * 24)) + '天前'
  return dateFormat(date, 'yyyy-MM-dd hh:mm')
}
