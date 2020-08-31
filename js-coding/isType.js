// console.log(name); // 输出undefined
// var name = 'iceman';

// console.log(name2); // Cannot access 'name2' before initialization
// let name2 = 'iceman';

function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']'
    }
}
var isArray = isType('Array')
var isObject = isType('Object')
console.log(isArray([1, 2])) // true
console.log(isObject([1, 2])) // false
console.log(isObject({})) // true
console.log(isObject(null)) // false

//   作者：lce_shou
//   链接：https://juejin.im/post/5b167b476fb9a01e5b10f19b
//   来源：掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// Object.prototype.toString.call(1) // "[object Number]"

// Object.prototype.toString.call('hi') // "[object String]"

// Object.prototype.toString.call({a:'hi'}) // "[object Object]"

// Object.prototype.toString.call([1,'a']) // "[object Array]"

// Object.prototype.toString.call(true) // "[object Boolean]"

// Object.prototype.toString.call(() => {}) // "[object Function]"

// Object.prototype.toString.call(null) // "[object Null]"

// Object.prototype.toString.call(undefined) // "[object Undefined]"

// Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

// Object.prototype.toString.call(/a/) // "[object RegExp]"


// Object instanceof Object // true
// Function instanceof Function // true
// Function instanceof Object // true
// Foo instanceof Foo // false
// Foo instanceof Object // true
// Foo instanceof Function // true

// 作者：nicole_zhang
// 链接：https://juejin.im/post/5b0b9b9051882515773ae714
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// typeof null // "object"
// null instanceof null // Right-hand side of 'instanceof' is not an object
// ({}) instanceof null // Right-hand side of 'instanceof' is not an object

// 6种基本类型，1种引用类型，共7种
// - number
// - string
// - null
// - undifined
// - boolean
// - symbol
// - object

// typeof xx 会得到下面7种结果，没有null, 但是多了function
// number, string, object, boolean, function, undefined, symbol 这七种类型

// 简单来说，我们使用 typeof 来判断基本数据类型是 ok 的，不过需要注意当用 typeof 来判断 null 类型时的问题，
// 如果想要判断一个对象的具体类型可以考虑用 instanceof，但是 instanceof 也可能判断不准确，比如一个数组，他可以被 instanceof 判断为 Object。
// 所以我们要想比较准确的判断对象实例的类型时，可以采取 Object.prototype.toString.call 方法。

// 作者：nicole_zhang
// 链接：https://juejin.im/post/5b0b9b9051882515773ae714
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。