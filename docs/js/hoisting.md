---
title: 变量提升
---
# 变量提升
## 什么是变量提升？
在当前上下文中（全局/私有/块级），js代码自上而下执行之前，浏览器会提前处理一些事情。
浏览器会把当前上下文中所有带 **var** 和 **function** 关键字进行提前的声明或者定义

> js中创建一个变量有六种方式：var let const class function import。其中只有var 和 function 才能触发变量提升。

* 声明 declare:   var a;
* 定义 defined:   a = 10;

#### 1. 带var的会提前声明

```js
console.log(a) // => undefined
var a = 10
console.log(a) // => 10
```
#### 2. 带funtion的会提前声明且定义。
```js
fn() // 已经声明函数fn且定义。 => hello
function fn() {
    console.log('hello')
}
```

#### 3. 函数表达式
然而在实际项目中，更建议使用函数表达式创建函数。这样在变量提升阶段只会声明fn，而不会定义。
```js
fn() // => Uncaught TypeError: fn is not a function
var fn = function () {
    console.log('ok')
}
```

```js
var fn = function () {
    console.log('ok')
}
fn() // 代码自上而下执行 => ok
```
#### 4. 与全局对象“映射”
带var 和 function 在全局上下文中声明的变量（全局变量）。会"映射"到全局对象（window/global）上，作为全局对象的一个属性。接下来代码执行的过程中，一个被改变，另一个也会跟着修改

```js
var a = 10
console.log(window.a) // => 10
window.a = 12
console.log(a) // => 12

// let声明的变量不会“映射”到全局对象
let b = 100
console.log(window.b) // => undefined


function test(){
 // 私有上下文中 var 声明也不会"映射"到全局
 var d = 10
 console.log(window.d)
}
test() // => undefined
```
#### 5. 块级作用域下的变量提升
在块级作用域下，无论条件是否成立，都会进行变量提升。但是function只会声明不会定义。
> IE6-IE8中块级作用域下function也会声明且定义。由于兼容IE8已经成为过去时，仅了解即可

```js
if (!('AAA' in window)) { // 变量提升，AAA已经被声明，但是未定义。所以此时window.AAA为undefined
  var a = 1
  function AAA() {
    console.log('hello')
  }
}
console.log(a) //  => undefined
console.log(AAA) // => undefined
console.log(BBB) // => function BBB() {console.log('hello')}
function BBB() {
  console.log('hello')
}
```

## 总结
浏览器会在执行代码之前，把当前上下文中所有带 **var** 和 **function** 关键字进行提前的声明或者定义。

由于变量提升的存在，代码的最终运行结果可能会与我们设想的结果有偏差，引出奇怪的bug。
```js
// 由于变量提升的机制，这段代码最终打印undefined，而不是我们设想的1
var foo = 1
function bar() {
    if(false) {
        var foo = 10
    }
    console.log(foo) // => undefined
}
bar()
```
在实际项目中声明变量还是建议使用ES6中的 let/const，声明函数使用函数表达式。这样代码会更严谨一些，减少不必要的问题出现。

### 无关紧要的彩蛋
##### 匿名函数具名化
```js
var fn = function AAA() {  // 具名化该函数为AAA
    console.log('ok')
}
```
* 在调试时，可以明确地在调用栈中看到该函数，如果不加这名称，也就是"匿名函数表达式"在调试时是看不到调用了什么的。这使得调试时多了一些便利
* 可以递归调用自身，不需要用严格模式下不支持的arguments.callee

> 总结：实际项目中具名化可加可不加，了解即可。
```js
setTimeout(function AAA(){
    // 可以递归调用自身，不需要用严格模式下不支持的arguments.callee
    AAA()
}, 0)
// 函数外部不可用
AAA()  => Uncaught ReferenceError: ccc is not defined
```
