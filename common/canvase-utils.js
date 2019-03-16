/**
 * 立Flag，带二维码
 * @param {*} opts
 */
const Flag = function(opts) {
  for (let key in opts) {
    this[key] = opts[key];
  }
  this.canvas = opts.canvas;
  this.ctx = this.canvas.getContext('2d');

  this.init();
}
Flag.prototype.init = function() {
  const _this = this;
  const clientWidth = this.getWindowInfo().width;
  const dpr = this.getWindowInfo().dpr;
  this.ctx.globalCompositeOperation = 'source-atop';//** 坑锯齿感觉没什么用不知道是不是用错地方了 **
  this.canvas.width = dpr * clientWidth;//由于手机屏幕时retina屏，都会多倍渲染，用dpr来动态设置画布宽高，避免图片模糊
  this.canvas.height = dpr * clientWidth * 603 / 375;//去掉微信头部的状态栏应该是603 没搞懂603还是不能让图片满屏直接多加到了609
  this.canvas.style.width = clientWidth + 'px';
  this.canvas.style.height = clientWidth * 603 / 375 + 'px';

  // 绘制背景图
  var img = new Image();
  img.crossOrigin = '';//死坑的图片跨域 （img.crossOrigin = "Anonymous"这种写法还是不能显示base64格式图片）
  img.src = _this.bgImg;
  _this.ctx.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.width * img.height / img.width);

  // 绘画头像在背景上
  if (_this.headerImg) {
    _this.canvasCircle(_this.canvas, _this.ctx, dpr, {
      img: _this.headerImg,
      circleR: 42,
      circleX: _this.canvas.width * 0.23,
      circleY: _this.canvas.height * 0.12,
      fillStyle: '#ffde00', lineWidth: 7
    });
  }
  // userName
  _this.canvasFillText(_this.canvas, _this.ctx, dpr, {
    message: this.userName,
    fontSize: 20,
    messageX: _this.canvas.width * 0.39,
    messageY: _this.canvas.height * 0.115,
    fontColor: '#00459c',
    textAlign: 'left'
  });
  // message
  _this.canvasFillText(_this.canvas, _this.ctx, dpr, {
    message: this.userMessage,
    fontSize: 20,
    messageY: _this.canvas.height * 0.265,
    fontColor: '#f94977'
  });
  // taskList
  var messageY = _this.canvas.height * 0.46;
  for (let i = 0; i < this.taskList.length; i++) {
    const interval = 30 * dpr;
    messageY = messageY + interval;
    _this.canvasFillText(_this.canvas, _this.ctx, dpr, {
      message: this.taskList[i],
      fontSize: 15,
      messageX: _this.canvas.width * 0.25, messageY,
      fontColor: '#00479d', textAlign: 'left'
    });
    _this.canvasCircle(_this.canvas, _this.ctx, dpr, {
      circleR: 10,
      messageY,
      circleX: _this.canvas.width * 0.19,
      circleY: messageY - 6 * dpr,
      fillStyle: '#003f99'
    });
    _this.canvasFillText(_this.canvas, _this.ctx, dpr, {
      message: i + 1,
      fontSize: 18,
      messageX: _this.canvas.width * 0.178,
      messageY: messageY + 1 * dpr,
      fontColor: '#ffffff',
      textAlign: 'left'
    });
  }

  _this.convertCanvasToImage(_this.canvas, _this.ctx, function(dataURL) {
    _this.dataUrl = dataURL;
  });
}
// 获取页面宽高
Flag.prototype.getWindowInfo = function() {
  var windowInfo = {};
  windowInfo.dpr = window.devicePixelRatio;
  if (window.innerWidth) {
    windowInfo.width = window.innerWidth;
  }
  else {
    windowInfo.width = document.body.clientWidth;
  }
  return windowInfo;
}
// 渲染图片方法
Flag.prototype.drawCanvasImg = function(canvas, ctx, dpr, src, x, y, width, height) {
  const img = new Image();
  img.crossOrigin = '';
  img.src = src;
  ctx.save(); // 保存当前ctx的状态
  ctx.drawImage(img, x, y, width, height);
  ctx.restore(); // 还原状态
}
Flag.prototype.clearChart = function() {
  // 清屏
  this.ctx.clearChart(0, 0, this.canvas.width, this.canvas.height);
}
// 在 canvas 中画文字
Flag.prototype.canvasFillText = function(canvas, ctx, dpr, opts) {
  const fontSize = `${dpr * opts.fontSize}px Arial`;
  const messageX = opts.messageX ? opts.messageX : canvas.width / 2;

  // 设置字体大小
  ctx.font = fontSize;
  // 设置字体颜色
  ctx.fillStyle = opts.fontColor;
  // 设置字体方向
  ctx.textAlign = opts.textAlign ? opts.textAlign : 'center';
  if (opts.message) {
    const messageY = Number(canvas.height) - (Number(canvas.height) - Number(opts.messageY));
    ctx.fillText(opts.message, messageX, messageY);
  }
}
// 画圆
Flag.prototype.canvasCircle = function(canvas, ctx, dpr, opts) {
  const circleR = opts.circleR ? opts.circleR * dpr : 20 * dpr;
  const circleX = opts.circleX ? opts.circleX : 60 * dpr;
  const circleY = opts.circleY ? opts.circleY : 0;
  const fillStyle = opts.fillStyle ? opts.fillStyle : '';

  if (opts.img) {
    const imgX = circleX - circleR; // 图片X开始坐标
    const imgY = circleY - circleR; // 图片Y开始坐标
    const imgWidth = 2 * circleR; // 图片按圆形大小

    const img = new Image();
    img.crossOrigin = '';
    img.src = opts.img;
    
    ctx.save(); // 保存当前ctx的状态
    ctx.arc(circleX, circleY, circleR, 0, 2 * Math.PI); //画出圆
    ctx.strokeStyle = fillStyle;
    ctx.lineWidth = opts.lineWidth ? opts.lineWidth * dpr : 0;
    ctx.fill();
    ctx.stroke();
    ctx.clip(); //裁剪上面的圆形
    ctx.drawImage(img, imgX, imgY, imgWidth, imgWidth); // 在刚刚裁剪的园上画图
    ctx.restore(); // 还原状态
  } else {
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleR, 0, 2 * Math.PI, true); //画出圆
    ctx.strokeStyle = fillStyle;
    ctx.lineWidth = opts.lineWidth ? opts.lineWidth * dpr : 0;
    ctx.fill();
    ctx.stroke();
  }
}
// 合成base64位分享图
Flag.prototype.convertCanvasToImage = function(canvas, ctx, callback) {
  const dataURL = canvas.toDataURL('image/png');

  if (typeof callback !== undefined) {
    callback(dataURL);
  }  
}

module.exports.Flag = Flag;