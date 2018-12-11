/**
 * 通过18位身份证[xxxxxx yyyy MM dd nnnm]，计算年龄。
 * （1）周岁算法：出生为0周岁，过满一年才加一岁。
 * （2）实岁算法：出生为0岁，元旦过年加一岁。【也叫‘公历年算法’】
 * （3）虚岁算法：出生为1岁，元旦过年加一岁。【实岁加1即可】
 * @param {Date} birthdayDate //正常的能被Date.parse()解析的日期
 * @param {Boolean} useFullYear //是否使用周岁算法，true-周岁算法，false-实岁算法，默认为false
 * calculateAge('111111200012151111',true) =>17
 * calculateAge('111111200012151111',false) =>18
 * =>birthdayDate:2000-12-15，17周岁，18实岁，19虚岁
 */
export function calculateAge(idCardStr, useFullYear = false) {
  if (!/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCardStr)) {
    console.error('Error: 输入参数不是18位身份证')
    return '请输入正确的18位身份证'
  }
  const birthdayDate = idCardStr.replace(/^\d{6}(\d{4})(\d{2})(\d{2})[0-9a-zA-Z]{4}/, '$1-$2-$3')
  const birth = new Date(birthdayDate)
  const birthYear = birth.getFullYear() // 'yyyy'
  const birthMonth = birth.getMonth() + 1 // 'M'
  const birthDay = birth.getDate() // 'D'
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth() + 1
  const nowDay = now.getDate()
  let returnFullAge // 返回的年龄(周岁)
  if (birth.getTime() > now.getTime()) {
    console.error(`出生日期不能早于当前时间！`)
    return '出生日期不能早于当前时间！'
  }
  const yearDiff = nowYear - birthYear // 年之差
  const monthDiff = nowMonth - birthMonth // 月之差
  const dayDiff = nowDay - birthDay // 日之差  

  if (yearDiff === 0) {
    returnFullAge = 0 // 同年则为0周岁
    console.log(`birthdayDate:${birthdayDate}，${returnFullAge}周岁，${yearDiff}实岁，${yearDiff + 1}虚岁`)
    return useFullYear ? returnFullAge : yearDiff
  }
  // 下面就是yearDiff>0的情况了
  if (monthDiff > 0) {
    returnFullAge = yearDiff
  } else if (monthDiff < 0) {
    returnFullAge = yearDiff - 1
  } else { // 月份相等，继续比较日期
    if (dayDiff < 0) {
      returnFullAge = yearDiff - 1
    } else {
      returnFullAge = yearDiff
    }
  }
  console.log(`birthdayDate:${birthdayDate}，${returnFullAge}周岁，${yearDiff}实岁，${yearDiff + 1}虚岁`)
  return useFullYear ? returnFullAge : yearDiff
}
