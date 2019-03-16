// url方法

export default {
  /*获取网址参数*/
  getURL(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) {return r[2];} return null;
  },
  /*获取全部url参数,并转换成json对象*/
  getUrlAllParams(url) {
    url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
      _arrS = _pa.split('&'),
      _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
      var pos = _arrS[i].indexOf('=');
      if (pos == -1) {
        continue;
      }
      var name = _arrS[i].substring(0, pos),
        value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
      _rs[name] = value;
    }
    return _rs;
  },
  /*删除url指定参数，返回url*/
  delParamsUrl(url, name) {
    var baseUrl = url.split('?')[0] + '?';
    var query = url.split('?')[1];
    if (query.indexOf(name) > -1) {
      var obj = {}
      var arr = query.split('&');
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=');
        obj[arr[i][0]] = arr[i][1];
      }
      delete obj[name];
      url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&');
      return url
    }
    return url;
        
  }
};


// 获取url上参数
export const getUrlParam = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = location.search.substr(1).match(reg) || location.hash.substr(1).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return '';
};

// 获取url上参数
export function getUrlParam2(arg1, arg2) {
  const result = {};
  let search = [];
  const url = arg2 || location.href.slice(location.href.indexOf('?') + 1);
  search = url.split('&');
  let secArray = [];
  for (let i = 0; i < search.length; i++) {
    secArray = search[i].match(/([^#&/?:]+)=([^#&?]+)/);
    if (secArray && secArray[1] !== '') {
      result[secArray[1].toLowerCase()] = secArray[2];
    }
  }
  if (arg1 !== undefined) {
    return result[arg1.toLowerCase()];
  } else {
    return result;
  }
}

// 拼接url
export function json2query(obj) {
  let query = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      query += `${key}=${element}&`;
    }
  }
  return query.slice(0, -1);
}
// json2query({api: "/baozi-sit", debug: "true", b: "200"})=>"api=/baozi-sit&debug=true&b=200"
