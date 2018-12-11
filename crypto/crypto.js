/**
 * 通过crypto-js实现 加解密工具
 * AES、HASH(MD5、SHA256)、base64
 */
import CryptoJS from 'crypto-js';
const KP = {
  iv: '16-Bytes--String'  // 偏移量
};
function getAesString(data, key, iv) { // 加密
  key = CryptoJS.enc.Utf8.parse(key);
  // alert(key）;
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString(); // 返回的是base64格式的密文
}
function getDAesString(encrypted, key, iv) { // 解密
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
// AES 对称秘钥加密
const aes = {
  en: (data, key) => getAesString(data, key, KP.iv),
  de: (data, key) => getDAesString(data, key, KP.iv)
};
// BASE64
const base64 = {
  en: (data) => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
  de: (data) => CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
};
// SHA256
const sha256 = (data) => {
  return CryptoJS.SHA256(data).toString();
};
// MD5
const md5 = (data) => {
  return CryptoJS.MD5(data).toString();
};


export {
  aes,
  md5,
  sha256,
  base64
};
