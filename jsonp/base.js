/*
 * @Author: laifeipeng 
 * @Date: 2019-02-24 11:04:08 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-02-24 11:11:48
 */
(function (window,document) {
  "use strict";
  var jsonp = function (url,data,callback) {

      // 1.将传入的data数据转化为url字符串形式
      // {id:1,name:'zhangsan'} => id=1&name=zhangsan
      var dataString = url.indexof('?') == -1? '?': '&';
      for(var key in data){
          dataString += key + '=' + data[key] + '&';
      };

      // 2 处理url中的回调函数
      // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 日期时间
      var cbFuncName = 'my_json_cb_' + Date.now();
      dataString += 'callback=' + cbFuncName;

      // 3.创建一个script标签并插入到页面中
      var scriptEle = document.createElement('script');
      scriptEle.src = url + dataString;

      // 4.挂载回调函数
      window[cbFuncName] = function (data) {
          callback(data);
          // 处理完回调函数的数据之后，删除jsonp的script标签
          document.body.removeChild(scriptEle);
      }

      // 5.append到页面中
      document.body.appendChild(scriptEle);
  }

  // 因为jsonp是一个私有函数外部不能调用，所有jsonp函数作文window对象的一个方法，供外部调用
  window.$jsonp = jsonp;

})(window,document)
