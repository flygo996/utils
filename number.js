// 保留几位小数
export function reservedDecimal(value, digit) {
  return Number(value).toFixed(digit);
}

/**
 * 从数组中随机取一个元素
 * 
 * @author tdy
 * @export
 * @param {Array} arr 
 * @returns 
 */
export function rndArrValue(arr) {
  if (arr.length < 1) {
    return '';
  }
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


// 联系人关系与代号的映射转换
const relationMap = (search) => {
  const relationMap = new Map([
    [0, '其他'],
    [61100, '父母'],
    [61101, '配偶'],
    [61102, '兄弟姐妹'],
    [62200, '朋友'],
    [62300, '同事'],
    [62400, '同学'],
  ]);
  if (typeof search === 'number') {
    return relationMap.get(search);
  } else {
    for (const [key, value] of relationMap.entries()) {
      if (value == search) {
        return key;
      }
    }
  }
};
