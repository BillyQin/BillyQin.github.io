---
title: 队列
---
# 队列
## 1. 实现一个简单队列
```js
function Queue() {
  this.container = [];
}

Queue.prototype = {
  constructor: Queue,
  // 进入队列元素
  enter: function enter(element) {
    return this.container.push(element);
  },
  // 移除队列元素
  leave: function leave() {
    return this.container.shift();
  },
  // 查看队列长度
  length: function length() {
    return this.container.length;
  },
  // 查看队列内容
  value: function value() {
    // 简单深拷贝，防止this.container被修改
    return JSON.parse(JSON.stringify(this.container));
  },
};
```
实现完成后简单验证一下
```js
// 创建一个队列
let qe = new Queue();
// 向队列添加5个元素
for (let i = 1; i < 6; i++) {
  qe.enter(i);
}
console.log(qe.value())
// 移除队列元素
qe.leave()
console.log(qe.value())
```
<!-- ![An image](./img/3.png) -->
## 2. 约瑟夫问题
```js
// 总共n人，第m人被移除
function josephus(n, m) {
  let qe = new Queue();
  for (let i = 1; i < n+1; i++) {
    qe.enter(i);
  }
  while(qe.length() > 1) {
    for (let i = 1; i < m; i++) {
      qe.enter(qe.leave(i));
    }
    qe.leave()
  }
  return qe.value()[0]
}
```
验证一下
```js
console.log(josephus(6,5))
```

## 3. 实现一个简单的优先级队列
```js
function Queue() {
  this.container = [];
}

Queue.prototype = {
  constructor: Queue,
  // priority越大，优先级越高
  enter: function enter(element, priority = 0) {
    const { length: len } = this.container;
    const node = {
      element,
      priority,
    };
    // 队列为空直接插入队列尾部
    if (len === 0) {
      this.container.push(node);
    } else {
      let flag = false;
      for (let i = len - 1; i >= 0; i--) {
        const item = this.container[i]
        if (priority <= item.priority) {
          // 插入到比较项的后面
          this.container.splice(i + 1, 0, node);
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.container.unshift(node);
      }
    }
    return this.container.length;
  },
  leave: function leave() {
    return this.container.shift();
  },
  length: function length() {
    return this.container.length;
  },
  value: function value() {
    // 简单深拷贝，防止this.container被修改
    return JSON.parse(JSON.stringify(this.container));
  },
};
```
照例来验证一下
```js
let qe = new Queue();
for (let i = 3; i < 6; i++) {
  qe.enter(i, i);
}

qe.enter(4, -5);
qe.enter(7, 3);
qe.enter(9, -2);

console.log(qe.value());
```

