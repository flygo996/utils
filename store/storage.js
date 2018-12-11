// Storage 储存操作

export default class Storage {
  constructor() {
    this.ls = window.localStorage;
    this.ss = window.sessionStorage;
  }
  /*-----------------cookie---------------------*/
  /*设置cookie*/
  setCookie(name, value, day = 1, options) {
    var setting = arguments[0];
    var oDate;
    var path = options.path ? ';path=' + options.path : '';
    var domain = options.domain ? ';domain=' + options.domain : '';
    var secure = options.secure ? ';secure' : '';
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate + path + domain + secure;
      }
    } else {
      oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + '=' + value + ';expires=' + oDate + path + domain + secure;
    }
  }
  /*获取cookie*/
  getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return '';
  }
  /*删除cookie*/
  removeCookie(name) {
    this.setCookie(name, 1, -1);
  }
  /*-----------------localStorage---------------------*/
  /*设置localStorage*/
  setLocal(key, val) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        this.ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val))
    }
  }
  /*获取localStorage*/
  getLocal(key) {
    if (key) {return JSON.parse(this.ls.getItem(key))}
    return null;
  }
  /*移除localStorage*/
  removeLocal(key) {
    this.ls.removeItem(key)
  }
  /*移除所有localStorage*/
  clearLocal() {
    this.ls.clear()
  }
  /*-----------------sessionStorage---------------------*/
  /*设置sessionStorage*/
  setSession(key, val) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        this.ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val))
    }
  }
  /*获取sessionStorage*/
  getSession(key) {
    if (key) {return JSON.parse(this.ss.getItem(key))}
    return null;
  }
  /*移除sessionStorage*/
  removeSession(key) {
    this.ss.removeItem(key)
  }
  /*移除所有sessionStorage*/
  clearSession() {
    this.ss.clear()
  }
}
