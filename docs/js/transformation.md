# 数据类型转换的4大核心规则

## 1. 其他数据转Number
### 手动转换方法
* **parseInt / parseFloat**

 先将参数转为字符串，从字符串左侧第一个字符开始，查找有效数字字符（遇到非有效数字字符时停止查找，不论后面是否还有数字字符，都不会再查找了），把找到的有效数字字符转换为数字，如果一个都没找到结果就是NaN （parseFloat比他多识别一个小数点）

* **Number**
  遇到非有效字符，结果都是NaN。但是有特殊情况（'',null, Symbol)


```js
Number('123px') // => NaN
parseInt('123px') // => 123

Number('')  // => 0
parseInt('') // => NaN

Number(undefined) // => NaN
parseInt(undefined) // => NaN

Number(null) // => 0
parseInt(null) // => NaN

Number(Symbol(1)) // => VM41:1 Uncaught TypeError: Cannot convert a Symbol value to a number
parseInt(Symbol(1)) // => NaN

Number(false) // => 0
Number(true) // => 1
```

### 隐式转换
* \+  // 相当于Number()
* ==比较的时候
* isNaN([val]) // 先用Number转成数字，再判断是否NaN

## 2. 其他数据转String
### 手动转换方法
* toString()
* String()

### 隐式转换
* 加号运算，一边是字符串，则进行字符串拼接

```js
console.log('shuqin' + null) // => shuqinnull
console.log(undefined + 'block') // => undefinedblock
```

* 对象转为数字，要先toString()转为字符串，再转换成数字

```js
Number({}) // => NaN    {} => '{}' => Number('{}') => NaN
const a = {
    toString: function() {
        return '666'
    }
}
Number(a) // => '666'
```

* 基于alert/confirm/prompt/document.write 等这些方式输出内容，都需要将内容先转成字符串

## 3. 其他数据转布尔
* 手动转换
    ！转布尔后取反
    ！！转布尔
    Boolean(val)
* 隐式转换
    循环或者条件判断中，条件处理的结果就是布尔类型

规则  只有 0、NaN、''、null、undefined 这五种情况转布尔后是false,其他是true

## 4. ==比较的过程中，数据转换的规则
* **特殊点**(表面上看上去是相同，其实是false)

 {} == {}: false // 比较的是对象的堆内存地址

 [] == []: false // 比较的是数组的堆内存地址

 NaN == NaN: false

* **类型不一样的转换规则**
    - null == undefined // => true
    - null === undefined // => false
    - 字符串 == 对象 要把对象转换为字符串
    - 剩下如果 == 两边数据类型不一致，都需要转换为数字再比较

```js
// [] => '' => 0, false => 0
console.log([] == false)  // true
// ![] => flase
console.log(![] == false) // true
```

* **对象隐式变数字**，应该先调用valueOf，如果没有值再调用toString变成字符串，最后字符串转数字

```
var a = {
    i: 0,
    valueOf: function() {
        return ++this.i
    }
}
// == 的过程中触发了隐式转换
if (a==1 && a==2 && a==3) {
    console.log('success')
}
```
```js
// 重写对象 valueOf、toString方法
const b = {
    valueOf: () => 1,
    toString: () => 2
}
// 证明对象隐式转换的时候先调用valueOf，再调用toString
console.log(b == 1) // => true
console.log(b == 2) // => false
```
* {} + 0 与 0 + {}
```js
// 这里比较特殊，js会把{}视为代码块，所以最后相当于只执行了 +0，输出0
console.log({}+0) // => 0
// 小括号包裹，就不会将{}视为代码块，对象直接隐式转换
console.log(({}+0)) // => [object Object]0
// 这里{}前面有+，不会视为代码块
console.log(0+{}) // => 0[object Object]
```