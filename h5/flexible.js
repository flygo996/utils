(function (doc, win) {
  var maxWidth = 1080;
  var baseWidth = 750;
  var baseFontSize = 100;
  var docEle = doc.documentElement,
      dpr=Math.min(win.devicePixelRatio, 3),
      scale = 1/dpr,
      resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';

  docEle.dataset.dpr = dpr;
  var metaEle = doc.createElement('meta');
  metaEle.name = 'viewport';
  metaEle.content = 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale;
  var pixelRatioScale = 1;
  if (getUrlParam("source") == "app" && win.devicePixelRatio == 3.5) {
      pixelRatioScale = 0.877;
  }
  var recalCulate = function (){
      var width = docEle.clientWidth;
      if(width > maxWidth){
          width = maxWidth;
      }
      var setFontSize = (baseFontSize * (width / baseWidth)) * pixelRatioScale

      docEle.style.fontSize = setFontSize + 'px';

      var renderFontSize = Number(window.getComputedStyle(document.querySelector("html")).fontSize.slice(0,-2));

      if (setFontSize != renderFontSize) {
          docEle.style.fontSize = setFontSize * (setFontSize / renderFontSize) + "px";
      }
  };
  recalCulate();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvent, recalCulate, false);

  function getUrlParam(){
      var result = {};
      var search = [];
      var url = !!arguments[1] ? arguments[1] : location.search.slice(1);
      var search = url.split("&");
      var secArray=[]
      for(var i =0;i<search.length;i++){
          secArray = search[i].split("=");
          if(secArray[0]!=''){
              result[secArray[0]] = secArray[1];
          }
      }
      if(arguments[0]!=undefined){
          return  result[arguments[0]];
      }else{
          return result;
      }
  }
})(document, window);