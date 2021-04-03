# 归并排序

```js
// 两个有序数组的合并
function merge(arr, p, q, r) {
  let a1 = arr.slice(p, q);
  let a2 = arr.slice(q, r);
  // 添加哨兵节点
  a1.push(Number.MAX_SAFE_INTEGER);
  a2.push(Number.MAX_SAFE_INTEGER);

  for (let k = p, i = 0, j = 0; k < r; k++) {
    // 因为添加了哨兵节点，所以无需判断数组a1或者a2是否有剩余
    arr[k] = a1[i] > a2[j] ? a2[j++] : a1[i++];
  }
  return arr;
}
// const arr = [1, 3, 5, 2, 4, 6];
// const arr2 = [1, 6, 2, 3, 4, 5];
// const arr3 = [2, 1];
// console.log(merge(arr, 0, 3, 6));
// console.log(merge(arr2, 0, 2, 6));
// console.log(merge(arr3, 0, 1, 2));

/**
 *
 *
 * @param {*} arr 排序数组
 * @param {*} p 排序数组起始位置
 * @param {*} r 排序数组终点位置
 */
function mergeSort(arr, p = 0, r = arr.length) {
  if (r - p < 2) {
    return
  };
  let q = Math.ceil(p + (r - p) / 2);
  mergeSort(arr, p, q);
  mergeSort(arr, q, r);
  merge(arr, p, q, r);
}

// 测试
const testArr = [38, 27, 43, 3, 9, 99, 82, 10]
mergeSort(testArr)
console.log(testArr)
```


O(NlogN)