export default {
  /* vue 官方推荐所有的state操作都要放在mutations里面  但是在外面也可以修改 */
  updateCount (state, {num1, num2}) {
    console.log(num1, num2)
    state.count = num1
  }
}
