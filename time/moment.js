// 日期格式化
// new moment().format("yyyy-MM-dd hh:mm:ss");

const Moment = function(timeStr) {
  this._date = timeStr ? new Date(timeStr) : new Date();
  return this;
}
Moment.prototype.format = function(fmt) {
  var year = this._date.getFullYear();
  var month = this._date.getMonth() + 1;
  var date = this._date.getDate();
  var hour = this._date.getHours();
  var minute = this._date.getMinutes();
  var second = this._date.getSeconds();
  
  fmt = fmt.replace('yyyy', year);
  fmt = fmt.replace('yy', year % 100);
  fmt = fmt.replace('MM', fix(month));
  fmt = fmt.replace('dd', fix(this._date.getDate()));
  fmt = fmt.replace('hh', fix(this._date.getHours()));
  fmt = fmt.replace('mm', fix(this._date.getMinutes()));
  fmt = fmt.replace('ss', fix(this._date.getSeconds()));
  return fmt;
  
  function fix(n) {
    return n < 10 ? '0' + n : n;
  }
}
Moment.prototype.formatLong = function(format) {
  var date = this._date;
  
  var map = {
    'M': date.getMonth() + 1, //月份
    'd': date.getDate(), //日
    'h': date.getHours(), //小时
    'm': date.getMinutes(), //分
    's': date.getSeconds(), //秒
    'q': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
}

export default Moment
