/* 
parseInt(string, radix)
参数	描述
string:	必需。要被解析的字符串。

radix:可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
*/
console.log([1, 2, 3].map(parseInt)) // [ 1, NaN, NaN ]
console.log([0, 1, 2, 3].map(parseInt)) // [ 0, NaN, NaN, NaN ]
console.log([0, 0, 1, 2, 3].map(parseInt)) // [ 0, NaN, 1, 2, 3 ]
