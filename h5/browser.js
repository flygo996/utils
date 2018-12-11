/**
   * 浏览器的方法
   */
class Browser {
  /**
   * 检测浏览器版本
   * @example
   * Browser.version().ios
   */
  static version() {
    const u = navigator.userAgent;
    return {
      trident: u.includes('Trident'), // IE
      presto: u.includes('Presto'), // Opera
      webKit: u.includes('AppleWebKit'), // webKit内核：Chrome、Safari浏览器
      gecko: u.includes('Gecko') && !u.includes('KHTML'), // Firefox
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 手机
      android: u.includes('Android') || u.includes('Linux'), // Android手机
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS
      iPhone: u.includes('iPhone'), // iPhone
      iPad: u.includes('iPad'), // iPad
      wechat: u.includes('MicroMessenger'), // 微信
      qq: u.match(/QQ/i) == 'qq', // QQ浏览器
      weibo: u.match(/WeiBo/i) == 'weibo' // 微博
    }
  }

  static pcType() {
    var u = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = u.includes('Opera'); //判断是否Opera浏览器
    var isIE = u.includes('compatible') && u.includes('MSIE') && !isOpera; //判断是否IE浏览器
    var isEdge = u.includes('Edge'); //判断是否IE的Edge浏览器
    var isFF = u.includes('Firefox'); //判断是否Firefox浏览器
    var isSafari = !u.includes('Chrome') && u.includes('Safari'); //判断是否Safari浏览器
    var isChrome = u.includes('Chrome') && u.includes('Safari'); //判断Chrome浏览器
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(u);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion == 7) { return 'IE7' }
      else if (fIEVersion == 8) { return 'IE8'; }
      else if (fIEVersion == 9) { return 'IE9'; }
      else if (fIEVersion == 10) { return 'IE10'; }
      else if (fIEVersion == 11) { return 'IE11'; }
      return 'IE7以下'//IE版本过低
    }
    if (isFF) { return 'FF'; }
    if (isOpera) { return 'Opera'; }
    if (isEdge) { return 'Edge'; }
    if (isSafari) { return 'Safari'; }
    if (isChrome) { return 'Chrome'; }
  }

  static isPC() { //是否为PC端
    var u = navigator.userAgent;
    var Agents = ['ipad', 'iphone', 'midp', 'rv:1.2.3.4', 'ucweb', 'android', 'windows ce', 'windows mobile'];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (u.match(new RegExp(Agents[v], 'i'))) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  
  static isMobile() {
    return !this.isPC();
  }
}
