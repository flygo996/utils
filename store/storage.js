// Storage 储存操作

export default class Storage {
  constructor() {
    this.ls = window.localStorage
    this.ss = window.sessionStorage
  }
  /* -----------------cookie--------------------- */
  /* 设置cookie */
  // expires: 设置过期时间，单位min，默认10分钟
  setCookie(name, value, expires = 10) {
    const exp = new Date()
    exp.setTime(exp.getTime() + expires * 60 * 1000)
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
  }
  /* 获取cookie */
  // 注意：过期后，得到的cookie为 null
  getCookie(name) {
    let arr
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)

    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
  /* 删除cookie */
  removeCookie(name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`
    }
  }
  /* -----------------localStorage--------------------- */
  /* 设置localStorage */
  setLocal(key, val) {
    var setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        this.ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val))
    }
  }
  /* 获取localStorage */
  getLocal(key) {
    if (key) {
      return JSON.parse(this.ls.getItem(key))
    }
    return null
  }
  /* 移除localStorage*/
  removeLocal(key) {
    this.ls.removeItem(key)
  }
  /* 移除所有localStorage*/
  clearLocal() {
    this.ls.clear()
  }
  getLocal3D(fieldName, key, _default = null) {
    const storageObj = this.ls.getItem(fieldName)
    if (key === undefined) {
      return storageObj
    }
    if (storageObj === null || JSON.parse(storageObj)[key] === null) {
      return _default
    }
    return JSON.parse(storageObj)[key]
  }
  setLocal3D(fieldName, key, value) {
    let storageObj = this.ls.getItem(fieldName)
    if (storageObj === null) {
      storageObj = {}
    } else {
      storageObj = JSON.parse(storageObj)
      if (storageObj[key] === null) {
        storageObj[key] = {}
      }
    }
    storageObj[key] = value
    this.ls.setItem(fieldName, JSON.stringify(storageObj))
  }
  /* -----------------sessionStorage---------------------*/
  /* 设置sessionStorage*/
  setSession(key, val) {
    var setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        this.ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val))
    }
  }
  /* 获取sessionStorage*/
  getSession(key) {
    if (key) {
      return JSON.parse(this.ss.getItem(key))
    }
    return null
  }
  /* 移除sessionStorage*/
  removeSession(key) {
    this.ss.removeItem(key)
  }
  /* 移除所有sessionStorage*/
  clearSession() {
    this.ss.clear()
  }
  getSession3D(fieldName, key, _default = null) {
    const storageObj = this.ss.getItem(fieldName)
    if (key === undefined) {
      return storageObj
    }
    if (storageObj === null || JSON.parse(storageObj)[key] === null) {
      return _default
    }
    return JSON.parse(storageObj)[key]
  }
  setSession3D(fieldName, key, value) {
    let storageObj = this.ss.getItem(fieldName)
    if (storageObj === null) {
      storageObj = {}
    } else {
      storageObj = JSON.parse(storageObj)
      if (storageObj[key] === null) {
        storageObj[key] = {}
      }
    }
    storageObj[key] = value
    this.ss.setItem(fieldName, JSON.stringify(storageObj))
  }
}
