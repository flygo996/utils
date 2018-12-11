/*
 * 常用的校验
 * @author laifeipeng
 * @date 2018.11.29
 */
class Validator {
  /* 是否是11位手机号码 */
  static isPhoneNumber(str) {
    return /^1[3-8]\d{9}$/.test(str)
  }
  /* 是否是11位虚拟手机号码-170、171开头 */
  static isVirtualPhoneNumber(str) {
    return /^1(70|71)\d{8}$/.test(str)
  }
  /* 是否是url地址 */
  static isUrl(str) {
    return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(str)
  }
  /* 是否是email地址 */
  static isEmail(str) {
    return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(str)
  }
  /**
   * 验证密码为6-20位的由数字和字母组成的规则
   * @param {string} str
   * @return {boolean}
   */
  static isPassword(str) {
    return /^[0-9A-Za-z]{6,20}$/.test(str) && !/^\d+$/.test(str) && !/^[A-Za-z]+$/.test(str)
  }
  /* 是否是18位身份证 */
  static isIdCard(str) {
    return /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str)
  }
  /**
    * @description 检查是否为合法的身份证号
    * @param {string} code [required]
    */
  static isCredit(code) {
    const city = {
      11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 '
    };
    let tip = '';
    let pass = true;
    code = code.toUpperCase();
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = '身份证号格式错误';
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      tip = '地址编码错误';
      pass = false;
    } else {
      // 18位身份证需要验证最后一位校验位
      code = code.split('');
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        sum += code[i] * factor[i];
      }
      // ∑(ai×Wi)(mod 11)
      if (parity[sum % 11] !== code[17]) {
        tip = '校验位错误';
        pass = false;
      }
    }
    return pass;
  }
}

// 脱敏
class desensitization {
  /* 11位手机号码脱敏 */
  static phoneNumber(str) {
    return str && str.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
  /* 邮箱脱敏 */
  static email(str) {
    let str1 = str.split('@')[0];
    const str2 = str.split('@')[1];

    if (str1.length > 3) {
      str1 = str1.replace(/(.{3})(.*)/, function (str, $1, $2) {
        return $1 + $2.replace(/./g, '*')
      });
    }

    return value && `${str1}@${str2}`
  }

  /* 18位身份证号脱敏 */
  static idCard(value) {
    return value && value.replace(/(\d{3})(.*)(\d{4})/, function (str, $1, $2, $3) {
      return $1 + $2.replace(/./g, '*') + $3
    });
  }

  /* 姓名脱敏 */
  static nameCode(name) {
    return name && name.replace(/(^.?)(.*)/g, function (str, $1, $2) {
      return $1 + $2.replace(/./g, '*')
    })
  }
}
