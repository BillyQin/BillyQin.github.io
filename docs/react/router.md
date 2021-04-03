## react 路由
## 路由的两种模式  history / hash

## hash
> 通过window的haschange事件，来获取到路由的变化
```js
window.addEventListener('hashchange', () => {
  console.log(window.location)
})
```

## history
> h5 新增的api。分别是 history.pushState 和 history.replaceState

* pushState 是给history stack添加一个路由。
* replaceState 是给history stack替换一个路由。

#### 监听

调用history.goBack / history.go(-1)时， 会触发 window.onpopstate方法
```js
window.onpopstate = function(event) {
  console.log('onpopstate',event)
}
```

但是调用history.pushState的时候，没有相应的方法。我们可以手动在window对象上添加自定义方法onpushstate。同时修改history.pushState方法，使其被调用时触发我们的自定义的onpushstate
```js
window.onpushstate = function() {
  console.log('onpushstate')
}

let oldPushState = history.pushState
history.pushState = function(...params) {
  // 如果自定义监听方法存在。则执行该方法
  if (typeof window.onpushstate === 'function') {
    window.onpushstate(...params)
  }
  return oldPushState.call(history, ...params)
}

```


