/**
 * @author: laifeipeng
 * @date: 2018.12.10
 * @desc: 金额格式化：一种是千分位分割，一种是金额大写
 */

/**
* 金额的千分位分割
* @param v {Number/String} 金额【整数、分数、整数负数都可以】
* @param n {Number} 小数位数，如果为0，则格式化为整数形式，否则格式化为对应n位小数点
* @rerurn {String} 带分隔符的金额
*/
function format2thousands(v, n = 0) {
  if (isNaN(Number(v))) {
    return 'NaN'
  }
  const L = 8 //小数点最大长度
  if (n < 0 || n > L) {
    console.error(`n不能为负数，也不能超过${L}位`)
    n = 2 //重置为2
  }
  s = (+v).toFixed(n)
  const l = s.split(".")[0].replace(/(?=(?!\b)(?:\d{3})+$)/g, ",")
  const r = s.split(".")[1]
  return r ? l + "." + r : l
}


// noSplitSymbol: 为true的话意思是不要千分位分隔符,默认带千位分隔符
/* 使用方法：{
         moneyFormatWithUnit(金额) : 按元来计算，要千位符
         moneyFormatWithUnit(金额, true): 按元来计算，不要千位符
         moneyFormatWithUnit(金额, true, '万元'): 按万元来计算，不要千位符
         moneyFormatWithUnit(金额, '万元'): 按万元来计算，要千位符
         moneyFormatWithUnit(金额, 'auto'): 超过一万元则按万元来计算，要千位符
         moneyFormatWithUnit(金额, 'autoNoYuan'): 超过一万元则按万元来计算，要千位符(单位不带‘元’)
    } */

const moneyFormatWithUnit = (amount, noSplitSymbol, unitForCal) => {
  let realNoSplitSymbol = noSplitSymbol;
  let realUnitForCal = unitForCal;
  if (typeof noSplitSymbol === 'string' && !unitForCal) {
    realUnitForCal = noSplitSymbol;
    realNoSplitSymbol = false;
  }
  let wAmount = `${amount}`;
  let unit;
  if (amount < 0) { return; }

  // 单位不固定
  if (realUnitForCal === 'auto') {
    if (amount >= 10000) {
      wAmount = `${amount / 10000}`;
      unit = '万元';
    } else {
      unit = '元';
    }
  } else if (realUnitForCal === 'autoNoYuan') {
    if (amount >= 10000) {
      wAmount = `${amount / 10000}`;
      unit = '万';
    } else {
      unit = '';
    }
  } else if (realUnitForCal === 'wanyuan') {
    wAmount = `${amount / 10000}`;
  }

  const dotIndex = wAmount.indexOf('.');
  if (dotIndex !== -1) {
    wAmount = parseFloat(wAmount.slice(0, dotIndex + 3));
  }
  wAmount = Number(wAmount).toFixed(2);
  wAmount = wAmount === 'undefined' ? '0' : wAmount;
  return (realNoSplitSymbol ? wAmount : fmoney(wAmount)) + (unit || '');
};

export default moneyFormat;



export function money2Chinese(n) {
  const fraction = ['角', '分'];
  const digit = [
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖',
  ];
  const unit = [
    [
      '元', '万', '亿',
    ],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p
      .replace(/(零.)*零$/, '')
      .replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}


/**
 * 
 * @param {Number} n 正整数金额
 * @returns 简单版的中文化金额
 * // money2ChineseSimple(45454100)=>"四千五百四十五万四千一百"
 * // money2ChineseSimple(45454100.456) => "四千五百四十五万四千一百" //忽略小数部分
 * // money2ChineseSimple(120000)=>"十二万" //"十二万"，而不是"一十二万"
 */
export function money2ChineseSimple(n) {
  if (isNaN(n)) return ''
  if (+n < 0) return '金额不能小于0'
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(+n)) return "数据非法";
  let unit = "京千百十兆千百十亿千百十万千百十";
  let str = "";
  n = Math.floor(n) + ''//舍弃小数
  const nLen = n.length
  unit = unit.substr(unit.length - nLen + 1);
  for (var i = 0; i < nLen; i++) {
    str += '零一二三四五六七八九'.charAt(n.charAt(i)) + unit.charAt(i);
  }
  // 下面解决12变成"一十二"（想要"十二"），120000变成"一十二万"（想要"十二万"）的问题
  if (nLen % 4 === 2) {
    if (+n[0] === 1) {
      str = str.slice(1)
    }
  }
  return str.replace(/零(千|百|十|角)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(兆|万|亿|元)/g, "$1")
    .replace(/(兆|亿)万/g, "$1")
    .replace(/(京|兆)亿/g, "$1")
    .replace(/(京)兆/g, "$1")
    .replace(/(京|兆|亿|千|百|十)(万?)(.)千/g, "$1$2零$3千")
    .replace(/零$/g, "")
}
