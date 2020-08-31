export const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))
export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
export const getSessionStorage = key => JSON.parse(window.sessionStorage.getItem(key))
export const setSessionStorage = (key, value) => window.sessionStorage.setItem(key, JSON.stringify(value))
/**
 * 给某个字段fieldName存储键值对key-value
 * eg1:
 * __AREA_LIST_BY_CODE__:{
 *  "0":["北京","江苏省","广东省","上海"],
 *  "440000":["广州市","佛山市","深圳市"],
 *  "440100":["越秀区","天河区","南沙区"]
 * }
 *
 * 注意：里面的xxx=== null，必须用3个等号（恒等），否则出现“6个蛋蛋”的问题！
*/
export function getLocalStorage3D(fieldName, key, _default = null) {
  const storageObj = window.localStorage.getItem(fieldName)
  if (key === undefined) {
    return storageObj
  }
  if (storageObj === null || JSON.parse(storageObj)[key] === null) {
    return _default
  }
  return JSON.parse(storageObj)[key]
}
export function getSessionStorage3D(fieldName, key, _default = null) {
  const storageObj = window.sessionStorage.getItem(fieldName)
  if (key === undefined) {
    return storageObj
  }
  if (storageObj === null || JSON.parse(storageObj)[key] === null) {
    return _default
  }
  return JSON.parse(storageObj)[key]
}

export function setLocalStorage3D(fieldName, key, value) {
  let storageObj = window.localStorage.getItem(fieldName)
  if (storageObj === null) {
    storageObj = {}
  } else {
    storageObj = JSON.parse(storageObj)
    if (storageObj[key] === null) {
      storageObj[key] = {}
    }
  }
  storageObj[key] = value
  window.localStorage.setItem(fieldName, JSON.stringify(storageObj))
}

export function setSessionStorage3D(fieldName, key, value) {
  let storageObj = window.sessionStorage.getItem(fieldName)
  if (storageObj === null) {
    storageObj = {}
  } else {
    storageObj = JSON.parse(storageObj)
    if (storageObj[key] === null) {
      storageObj[key] = {}
    }
  }
  storageObj[key] = value
  window.sessionStorage.setItem(fieldName, JSON.stringify(storageObj))
}

