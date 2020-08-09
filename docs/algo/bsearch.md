# 二分查找

## 二分查找的主要思路
二分查找针对的是一个**有序**的数据集合，查找思想有点类似分治思想。每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素，或者区间被缩小为 0。

```js
// 二分查找
function bsearch(arr, value) {
  // 查询区间左边界
  let left = 0
  // 查询区间右边界
  let right = arr.length - 1
  // 猜测元素所在的位置
  let guess

  while (l <= r) {
    // guess为左右边界的中间位置。中间位置为 (l+r)/2，为了防止溢出，这里改为 l + (r - l) /2
    guess = Math.floor(l + (r - l) / 2)
    // 查找到元素，直接return 元素在数组中的id，即guess
    if (arr[guess] === value) {
      return guess
    }
    // 没找到元素，重新划定左右边界
    else if (arr[guess] > value) {
      r = guess - 1
    } else {
      l = guess + 1
    }
  }
  // 循环结束后还查找不到元素，返回-1
  return -1
}
// 测试
const testArr = [3, 5, 19, 22, 25, 33, 45, 47, 57, 66, 71, 78]
console.log(bsearch(testArr, 88))
console.log(bsearch(testArr, 68))
console.log(bsearch(testArr, 22))
```

## 优势

1. 性能相对顺序查找好，时间复杂度为O(logN)。（顺序查找时间复杂度为O(N))

## 局限性
1. 底层必须依赖数组，并且还要求数据是有序的。

2. 对于较小规模的数据查找，二分查找的优势并不明显。

3. 二分查找更适合处理静态数据，也就是没有频繁的数据插入、删除操作。