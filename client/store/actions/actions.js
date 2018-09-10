export default {
  // updateCountAsync(store, data) {
  //   setTimeout(() => {
  //     console.log(store)
  //     store.commit('updateCount', {num1: data.num1})
  //   }, data.time)
  // },

  updateCountAsync: ({commit}, params) => {
    console.log('---------------------------')
    console.log({commit})
    console.log(params)
  }
}
