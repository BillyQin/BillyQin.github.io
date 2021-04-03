## 防抖和节流

## 防抖 debounce
> 用户频繁触发的时候，只触发一次。（触发第一次/最后一次）

```js
/**
 *
 *
 * @param {*} fn 需要执行的函数
 * @param {number} [wait=500] 检测防抖的时间间隔
 * @param {boolean} [immediate=false] 是否立即执行（true则第一次触发时立即执行，false是以最后一次触发为准）
 * @returns
 */
function debounce(fn, wait = 500, immediate = false) {
  let time = null;
  return function anonymous(...params) {
    // 判断是否第一次： 设置了immediate 和 且定时器为空
    let now = immediate && !time;
    clearTimeout(time);
    time = setTimeout(() => {
      time = null;
      // 到时间了 不再执行
      if (!immediate) {
        fn.call(this, ...params);
      }
    }, wait);
    // 第一次 执行函数
    if (now) {
      fn.call(this, ...params);
    }
  };
}
```

## 节流 throttle
> 实现函数的节流 （在频繁触发中缩减触发的频率）

```js
/**
 *
 *
 * @param {*} fn 执行的函数
 * @param {number} [wait=500]
 */
function throttle(fn, wait = 1000) {
  // 上一次执行的时间
  let pre = 0;
  let timer = null;
  return function anonymous(...params) {
    let now = new Date();
    // 剩余时间
    let remaining = wait - (now - pre);
    if (remaining <= 0) {
      // 清空定时器
      clearTimeout(timer)
      timer = null
      pre = new Date()
      // 执行函数
      fn.call(this, ...params)
    } else if(!timer) {
      // 设置一个定时器在 在剩余时间后执行函数
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        pre = new Date()
        fn.call(this, ...params)
      }, remaining)
    }
  };
}
```