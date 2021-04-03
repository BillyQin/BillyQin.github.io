# 快速排序
```js
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let midId = Math.floor(arr.length / 2);
  let mid = arr[midId];

  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === midId) {
      continue;
    }
    if (arr[i] > mid) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat([mid], quickSort(right))
}

// 测试
const testArr = [38, 27, 43, 3, 9, 98, 82, 10];

console.log(quickSort(testArr));
```