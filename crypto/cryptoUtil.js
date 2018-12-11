import {aes} from './crypto'
//加密
export function encryption(params) {
  console.log('没有加密的数据,没有加密的数据,没有加密的数据');
  console.log(params);
  let tempParams = {};
  let aesKey = JSON.parse(window.native.getAesKey());
  if (!aesKey.aesKey || !aesKey.sslToken) {
    window.h5.paramsStatus = false;
    return params;
  }
  window.h5.paramsStatus = true;
  tempParams.encryptData = aes.en(JSON.stringify(params), aesKey.aesKey);
  tempParams.sslToken = aesKey.sslToken;
  return tempParams;
}


export function decode(res) {
  if (window.native) {
    console.log(res);
    let aesKey = JSON.parse(window.native.getAesKey());
    let datas = res.data;
    let data = {};
    let tempData = res.data.payload === null ? null : res.data.payload.encryptRespData;
    data.code = datas.code;
    data.message = datas.message;
    if (aesKey.aesKey && aesKey.sslToken && res.data.payload && res.data.payload.encryptRespData) {
      data.payload = tempData ? JSON.parse(aes.de(tempData, aesKey.aesKey)) : null;
    } else {
      data.payload = res.data.payload;
    }
    console.log('接口解密数据------------');
    console.log(data);
    return data;
  } else { // eslint-disable-line
    return res
  }

}
