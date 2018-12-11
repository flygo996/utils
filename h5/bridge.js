/* eslint-disable */
// eventHandler为独立模块
var eventHandler = function () {
  this.eventList = {};
  this.eventRely = {};
};
eventHandler.prototype.on = function (eventName, handler) {
  if (typeof eventName !== 'string') {
    console.log('eventName must be a string!');
    return false;
  }
  if (typeof handler !== 'function') {
    console.log('event handler must be a function!');
    return false;
  }
  if (!(eventName in this.eventList)) {
    this.eventList[eventName] = [];
  }
  this.eventList[eventName].push(handler);
  return this; // to support chain method
};
eventHandler.prototype.rely = function (eventName, relyEventList) {
  if (this.eventRely[eventName] === undefined) {
    this.eventRely[eventName] = [];
  }
  for (var i = 0; i < relyEventList.length; i++) {
    if (this.eventRely[eventName].indexOf(relyEventList[i]) == -1) {
      this.eventRely[eventName].push(relyEventList[i]);
    }
  }
};
eventHandler.prototype.off = function (eventName, handler) {
  if (typeof eventName !== 'string') {
    console.info('eventName must be a string!');
    return false;
  }
  if (handler == undefined) {
    // remove all handlers
    this.eventList[eventName] = [];
    return this; // to support chain method
  } else {
    if (typeof handler !== 'function') {
      console.info('event handler must be a function!');
      return false;
    }
    if (this.eventList[eventName] === undefined) {
      console.log("'" + evnetName + "' has not been registered!");
    } else {
      for (var i = 0; i < this.eventList[eventName].length; i++) {
        if (this.eventList[eventName][i] === handler) {
          this.eventList[eventName].splice(i, 1);
          i--;
        }
      }
    }
  }
};
eventHandler.prototype.emit = function (eventName, data) {
  if (typeof eventName !== 'string') {
    console.info('eventName must be a string!');
    return false;
  }
  if (!this.eventList[eventName]) {
    console.log("'" + eventName + "' emitted before defined!");
    this.checkRely(eventName);
    return;
  }
  for (var i = 0; i < this.eventList[eventName].length; i++) {
    var handler = this.eventList[eventName][i];
    if (this.host) {
      handler.call(this.host, data);
    } else {
      handler(data);
    }
  }
  this.checkRely(eventName);
};
eventHandler.prototype.checkRely = function (eventName) {
  for (var relyEvent in this.eventRely) {
    for (var i = 0; i < this.eventRely[relyEvent].length; i++) {
      if (this.eventRely[relyEvent][i] === eventName) {
        this.eventRely[relyEvent].splice(i, 1);
        break;
      }
    }
    if (this.eventRely[relyEvent].length === 0) {
      var relyEventName = relyEvent;
      delete this.eventRely[relyEvent];
      this.emit(relyEventName);
    }
  }
};

function isIOS() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function getUrlParam() {
  var result = {};
  var search = [];
  var url = arguments[1] ? arguments[1] : location.search.slice(1);
  search = url.split('&');
  var secArray = [];
  for (var i = 0; i < search.length; i++) {
    secArray = search[i].split('=');
    if (secArray[0] !== '') {
      result[secArray[0]] = secArray[1];
    }
  }
  if (arguments[0] !== undefined) {
    return result[arguments[0]];
  } else {
    return result;
  }
}

function sendBridgeMsg(data) {
  var msg = JSON.stringify(data);
  console.log('nativeMsg：' + msg);
  try {
    // 向app 传递信息
    if (isIOS()) {
      window.webkit.messageHandlers.jsCallOC.postMessage(msg);
    }
    if (!isIOS()) {
      if (typeof WebViewBridge !== 'undefined') {
        WebViewBridge.send(msg);
      } else {
        window.postMessage(msg);
      }
    }
  } catch (error) {
    console.log('nativeMsg 发送失败：' + msg);
    console.log(error);
  }
}

function handleMessage(data) {
  var dataObj = JSON.parse(data);
  var cbName = dataObj.type || dataObj.callbackName;
  var typeCallBack = handleCallbackStack[cbName];
  if (typeof typeCallBack === 'function') {
    try {
      typeCallBack(dataObj.params);
    } catch (error) {
      console.log(error);
    }
    handleCallbackStack[cbName] = null;
  } else if (Object.prototype.toString.call(typeCallBack) == '[object Array]') {
    //如果是数组,挨个遍历数组进行回调
    typeCallBack.forEach(func => {
      typeof func === 'function' && func(dataObj.params);
    });
    handleCallbackStack[cbName] = null;
  }
}

/**
 * 回调处理堆栈
 */
var handleCallbackStack = {};
var wallet = {
  isDebug: getUrlParam('debug') === 'true',
  isIOS: isIOS(),
  isWap: !!getUrlParam('isWap'),
  isApp:
    getUrlParam('source') === 'app' ||
    navigator.userAgent.indexOf('baoziloan') > -1,
  isWeixin: navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1,
  token: '',
  tokenKey: '',
  isLogin: false,
  userData: {
    userId: '',
    phone: '',
  },
  appInfo: {},
  eventHandler: new eventHandler(),
  params: getUrlParam(),
  basePath: '',
  platform: '',
};

// 获取用户信息
wallet.getUserInfo = function (callback, id) {
  sendBridgeMsg({
    type: 'getUserinfo',
  });

  // 回调改为数组,反正被覆盖;
  if (handleCallbackStack['getUserinfoCompleted'] == undefined) {
    handleCallbackStack['getUserinfoCompleted'] = [];
  }
  const func = function (data) {
    wallet.isLogin = data.isLogin;
    wallet.token = data.token;
    wallet.tokenKey = data.tokenKey;
    wallet.userData = {
      phone: data.phone,
      userId: data.userId,
    };
    typeof callback === 'function' && callback(data);
  };
  handleCallbackStack['getUserinfoCompleted'].push(func);
  // handleCallbackStack['getUserinfoCompleted'] = function(data) {
  //   wallet.isLogin = data.isLogin;
  //   wallet.token = data.token;
  //   wallet.tokenKey = data.tokenKey;
  //   wallet.userData = {
  //     phone: data.phone,
  //     userId: data.userId,
  //   };
  //   typeof callback === 'function' && callback(data);
  // };
};

// 获取APP信息
wallet.getAppInfo = function (callback) {
  sendBridgeMsg({
    type: 'getAppInfo',
  });
  handleCallbackStack['getAppInfoCallback'] = function (data) {
    wallet.appInfo = data;
    typeof callback === 'function' && callback(data);
    wallet.eventHandler.emit('gotAppInfo');
  };
};

// 打开页面 (包括原生和h5)
wallet.openPage = function (url, title, paras, close) {
  console.log(url);
  if (url.indexOf('native://') >= 0) {
    sendBridgeMsg({
      type: 'openPage',
      params: {
        url: url,
        params: paras,
        title: title,
        closeWebView: !!close,
      },
    });
  } else {
    location.href = url;
  }
};

// 关闭页面 (关闭h5页面)
wallet.closePage = function () {
  sendBridgeMsg({
    type: 'closePage',
  });
};

// 调用APP的登陆页
wallet.login = function () {
  sendBridgeMsg({
    type: 'login',
  });
};

// h5询问客户端用户是否实名
wallet.checkNameAuthed = function (callback) {
  sendBridgeMsg({
    type: 'isNameAuthed',
  });
  handleCallbackStack['isNameAuthedCallback'] = function (data) {
    console.log('H5收到了来自APP的回调：isNameAuthedCallback');
    typeof callback === 'function' && callback(data);
  };
};

// 打电话 (h5调用APP)
// phoneNumber 可以是手机或者座机，可以加前缀+86
wallet.callPhone = function (phoneNumber) {
  sendBridgeMsg({
    type: 'callPhone',
    params: {
      phoneNumber,
    },
  });
};

// 个人资质页面，传给APP的滚动高度
wallet.scrollTopDistanceHandle = function (scrollTop) {
  sendBridgeMsg({
    type: 'scrollTopDistance',
    params: {
      scrollTop
    }
  });
};

// 第二步 step2   OCR  idCardAuthStart
wallet.idCardAuthHandle = function (callback) {
  sendBridgeMsg({
    type: 'idCardAuthStart',
  });
  handleCallbackStack['idCardAuthCallback'] = function (data) {
    console.log('H5收到了来自APP的回调：idCardAuthCallback');
    typeof callback === 'function' && callback(data);
  };
};

// 第三步 step3   活体检测  faceAuthStart
wallet.faceAuthHandle = function (userInfo, callback) {
  sendBridgeMsg({
    type: 'faceAuthStart',
    params: {
      idCardNo: userInfo.idCardNo,
      name: userInfo.name,
    },
  });
  handleCallbackStack['faceAuthCallback'] = function (data) {
    console.log('H5收到了来自APP的回调：faceAuthCallback');
    typeof callback === 'function' && callback(data);
  };
};

// 改版后的，调起原生APP的实名认证流程，原来的2+3
wallet.nameAuthHandle = function (callback) {
  sendBridgeMsg({
    type: 'nameAuthStart',
  });
  handleCallbackStack['nameAuthCallback'] = function (data) {
    console.log('H5收到了来自APP的回调：nameAuthCallback');
    typeof callback === 'function' && callback(data);
  };
  handleCallbackStack['nameAuthCallBack'] = function (data) {
    console.log('H5收到了来自APP的回调：nameAuthCallBack');
    typeof callback === 'function' && callback(data);
  };
};

// 点击分享  -分享给微信等  clickShare
wallet.clickShare = function (param, callback) {
  sendBridgeMsg({
    type: 'clickShare',
    params: {
      url: param.url, //string, //分享连接
      title: param.title, //string, //分享标题
      img: param.img, //string,//分享图片地址
      msg: param.msg, //string, // 分享内容
      enable: ['wx'], //['wx', 'pyq', 'qq', 'qzone', 'weibo', 'sms', 'qrcode', 'copy'],//显示的分享渠道
      // modalTitle: param.modalTitle,//string, // 分享弹窗标题
      // modalContent: param.modalContent,//string, // 分享弹窗内容
    },
  });
  handleCallbackStack['shareCallback'] = function (data) {
    console.log('H5收到了来自APP的回调：shareCallback');
    typeof callback === 'function' && callback(data);
  };
};

wallet.quoteAssessmentFinished = function () {
  sendBridgeMsg({
    type: 'quoteAssessmentCallback',
    params: {
      linkUrl: 'baozidai://native?path=preCreditAuth&pushType=3',
    },
  });
};

wallet.quoteActivationFinished = function (url) {
  sendBridgeMsg({
    type: 'quoteActivationCallback',
    params: {
      linkUrl: url,
    },
  });
};

wallet.quoteAssessmentRetry = function () {
  sendBridgeMsg({
    type: 'quoteAssessmentRetry',
    params: {
      linkUrl: 'baozidai://native?path=amount&pushType=3',
    },
  });
};

wallet.init = function (argument) {
  var callback,
    option = {};
  if (typeof argument === 'function') {
    callback = argument;
  }
  if (typeof argument === 'object') {
    option = argument;
  }

  if (typeof option === 'object') {
    for (var key in option) {
      wallet[key] = option[key];
    }
  }
  if (!wallet.isWap) {
    wallet.getUserInfo();
    wallet.getAppInfo();
  }

  if (wallet.isWap) {
    if (typeof callback === 'function') {
      callback();
    }
  }
};

wallet.init();
window.wallet = wallet;
window.document.addEventListener('message', function (e) {
  handleMessage(e.data);
});
window.message = function (e) {
  handleMessage(JSON.stringify(e.data));
};

if (typeof WebViewBridge !== 'undefined') {
  WebViewBridge.onMessage = function (e) {
    handleMessage(e);
  };
}

// 平台类型(ios_app, android_app, ios_h5, android_h5, ios_weixin, android_weixin, others_h5)
if (wallet.isApp && wallet.isIOS) {
  wallet.platform = 'ios_app';
}
if (wallet.isApp && !wallet.isIOS) {
  wallet.platform = 'android_app';
}
if (wallet.isWeixin && wallet.isIOS) {
  wallet.platform = 'ios_weixin';
}
if (wallet.isWeixin && !wallet.isIOS) {
  wallet.platform = 'android_weixin';
}
if (!wallet.isApp && !wallet.isWeixin && wallet.isIOS) {
  wallet.platform = 'ios_h5';
}
if (!wallet.isApp && !wallet.isWeixin && !wallet.isIOS) {
  wallet.platform = 'android_h5';
}

// 通用方法
wallet.callApp = function (data, callback) {
  var cbName = data.callbackName;
  if (cbName) {
    handleCallbackStack[cbName] = function (info) {
      typeof callback === 'function' && callback(info);
    };
  }
  //需要回调
  sendBridgeMsg({
    type: data.type,
    params: data.para || {},
  });
};
