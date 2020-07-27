---
title: 深入Hook之useState、useRef、useCallback、useMemo
---
## 简介
#### Hook是什么?

1. Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
2. 如果你在编写函数组件并意识到需要添加一些 state，以前的做法是必须转化为 class 组件，而现在可以直接在函数组件中使用 hook

#### 为什么用hook？

1. 组件之间复用状态逻辑很难，可能会用到 render props 或者高阶组件。hook 可以在无需修改组件结构的情况下复用状态逻辑
2. 复杂组件变得难以理解，hook 将组件中相互关联的部分拆分成更小的函数（包括设置订阅或请求数据）
3. 相对难以理解的 class,包括难以捉摸的 this
4. 完全可选。无需重构现有项目中的任何代码，就可以尝试 Hook。(前提是升级 React 到 16.8)

## 使用
### 使用useState

- 通过在函数组件里调用 useState 来给组件添加一些内部的 state

```js
const [state, useState] = useState(initialValue);
```

- 一个参数：状态的初始值
- 返回一个数组 arr：arr[0]是状态，arr[1]是修改状态的函数。

DEMO

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState(0);

  const click = () => setNum(num + 1);

  return <button onClick={click}>{num}</button>;
}
```

## “陷阱”

1. 修改状态的函数类似 class 组件的 this.setState,但是它不会把新的 state 和旧的 state 合并。

```js
function Counter() {
  const [obj, setObj] = useState({ name: 'qcd', age: 18 });
  const click = () => setObj({ age: obj.age + 1 });

  return (
    <>
      <p>{obj.name}</p>
      <button onClick={click}>{obj.age}</button>
    </>
  );
}
```

解决方案：

```js
// 如果需要，则需手动合并状态
const click = () => setObj({ ...obj, age: obj.age + 1 });
```

2. setTimeout/setInterval

```js
function Counter() {
  const [num, setNum] = useState(0);
  const click = () => {
    setNum(num + 1);
  };

  const alertHandle = () => {
    setTimeout(() => {
      console.log(num);
    }, 3000);
  };

  return (
    <>
      <p>{num}</p>
      <button onClick={click}>click</button>
      <button onClick={alertHandle}>alert</button>
    </>
  );
}
```

解决方案：

```js
function Counter() {
  const [num, setNum] = useState(0);
  // 使用useRef保存需要的值
  const saveCurrent = useRef(); // 返回一个对象 {current: undefined}
  const click = () => {
    setNum(num + 1);
    saveCurrent.current = num + 1;
  };

  const alertHandle = () => {
    // 3秒延迟以后打印最新的值
    setTimeout(() => {
      console.log(saveCurrent.current);
    }, 3000);
  };

  return (
    <>
      <p>{num}</p>
      <button onClick={click}>click</button>
      <button onClick={alertHandle}>alert</button>
    </>
  );
}
```

3. 函数式更新
   > 如果新的状态需要根据旧的状态计算得出，可以传递一个函数给 setState,函数的参数是当前的 state,返回一个新的状态

```js
function Counter() {
  const [num, setNum] = useState(0);
  const click = () => {
    setNum(num + 1);
  };

  const alertHandle = () => {
    setTimeout(() => {
      // 3秒延迟以后更新状态
      // setNum(num + 1);
      // 3秒延迟以后打印最新的状态
      setNum((num) => num + 1);
    }, 3000);
  };

  return (
    <>
      <p>{num}</p>
      <button onClick={click}>直接+1</button>
      <button onClick={alertHandle}>延迟3秒+1</button>
    </>
  );
}
```

4. 如果传入更新函数的对象是旧状态对象的话，则会跳过组件更新和渲染。这个 react 内部做的一个优化(内部用的 Object.is 去比较新旧状态是否为同一个值)

```js
function Counter() {
  const [num, setNum] = useState({ number: 1 });
  const click = () => {
    setNum(Object.assign(num, { number: 2 }));
  };
  return (
    <>
      <p>{num.number}</p>
      <button onClick={click}>直接+1</button>
    </>
  );
}
```

## 优化 - 减少组件的渲染次数

1. 函数组件使用 memo 来达到类组件中 PureComponent 同样的效果

```js
function Child() {
  console.log('child render');
  return <div>this is child</div>;
}

const ChildComponent = React.memo(Child);

function Counter() {
  const [num, setNum] = useState(0);
  const click = () => {
    setNum(num + 1);
  };
  return (
    <>
      <p>{num}</p>
      <button onClick={click}>直接+1</button>
      <ChildComponent />
    </>
  );
}
```

2. memo 本质上是通过浅比较的方式对比 props，props 相同就不会触发渲染.(memo 方法还有第二个参数，可以手动判断返回 true 或者 false)

> 如果 props 是引用类型的值，父组件在每一次渲染的过程中都会重新生产。此时需要根据需求结合 useCallback 或者 useMemo 来让多次渲染中的值保持一致。

```js
function Child(props) {
  const { value, changeHandle } = props;
  console.log('child render');
  return (
    <>
      <input value={value} onChange={changeHandle} />
    </>
  );
}

const ChildComponent = React.memo(Child);

function Counter() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState('');

  const click = useCallback(() => {
    setNum(num + 1);
  });
  // change每次渲染都重新生成

  // const change = (e) => {
  //   setName(e.target.value)
  // }
  // 可以使用useCallback包裹函数，每次渲染返回相同的函数
  // 第二个参数是可依赖项
  const change = useCallback((e) => {
    setName(e.target.value);
  });
  // useMemo
  const data = useMemo(()=> {num}, [num])

  return (
    <>
      <p>{num}</p>
      <button onClick={click}>直接+1</button>
      <ChildComponent value={name} changeHandle={change} />
    </>
  );
}
```

## 实现

1. useState
第一版
```js
let lastState = null;
function useState(initialValue) {
  lastState = lastState || initialValue;

  const setState = (_state) => {
    if (typeof _state === 'function') {
      // 执行传入的函数，将返回值更新到lastState
      lastState = _state(lastState);
    } else {
      lastState = _state;
    }
    // 状态修改完毕，更新组件
    render();
  };

  return [lastState, setState];
}
```
第二版
> 组件中可能会多次调用useState, 使用第一版的值就会出现覆盖

> 采用数组记录多个useState的值，所以不能在循环、条件语句(if、while、for)中调用useState。否则useState的值会错乱


```js
let lastStates = [];
let index = 0;
function useState1(initialValue) {
  lastStates[index] = lastStates[index] || initialValue;
  const currentIndex = index;
  const setState = (newState) => {
    if (typeof newState === 'function') {
      lastStates[currentIndex] = newState(lastStates[currentIndex]);
    } else {
      lastStates[currentIndex] = newState;
    }
    render();
  };
  return [lastStates[index++], setState];
}
```

2. useRef
```js
const ref = { current: undefined }
function useRef() {
  return ref
}
```

3. useCallback
```js
let lastCallback = null;
let lastCallbackDependencies = null;
function useCallback(callback, dependencies = []) {
  if (lastCallback) {
    // 依赖数组中每一项都和之前都一样，则返回true，否则返回false
    let change = !dependencies.every((item, index) => {
      return item === lastCallbackDependencies[index]
    })

    if (change) {
      lastCallback = callback
      lastCallbackDependencies = dependencies
    }
  } else {
    // 第一次渲染
    lastCallback = callback
    lastCallbackDependencies = dependencies
  }
  return lastCallback
}
```

4. useMemo
useMemo和useCallback基本一致。
```js
let lastCallback = null;
let lastCallbackDependencies = null;
function useCallback(callback, dependencies = []) {
  if (lastCallback) {
    let change = !dependencies.every((item, index) => {
      return item === lastCallbackDependencies[index]
    })

    if (change) {
      // 执行callback，存下返回的结果
      lastCallback = callback()
      lastCallbackDependencies = dependencies
    }
  } else {
    // 第一次渲染，执行callback，存下返回的结果
    lastCallback = callback()
    lastCallbackDependencies = dependencies
  }
  return lastCallback
}
```
