## useReduce

const [count, dispatch] = useReducer(reducer, 0, init)

## useContext

跨组件传参

useContext + useReduce = hook版 redux

/* ******** */

1. hooks为什么会出现 作用 怎么使用  实现

什么时候会用hooks

想给函数组件添加状态、生命周期 ，函数组件-> 类组件 （可复用性稍差、性能稍差（实例）、生命周期管理、this）

hooks + 函数组件 实现 原本类组件才能实现的功能

2. 作用

