import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(Vuex)
Vue.use(VueRouter)

// const root = document.createElement('div')
// document.body.appendChild(root)

const router = createRouter()
const store = createStore()
// 动态注册store
store.registerModule('c', {
  state: {
    text: 'c'
  }
})
// store.unregisterModule('c')
// 接受两个函数钩子参数:在监听state的时候,返回值作为第二个函数的参数
// store.watch((state)=>state.count+1,(newCount)=>{console.log(newCount)})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
