import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store = new Vuex.Store({
    /* 添加这个配置 就无法重外部修改数据
    这是代码规范
    开发时候可以使用, 正式上线的时候不建议 */
    strict: isDev,

    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('store plugins')
        store.subscribeAction((action, state) => {
          console.log(action.type)
          console.log(action.payload)
        })
      },
      (store) => {
        store.subscribe((mutation, state) => {
          console.log(mutation.type)
          console.log(mutation.payload)
        })
      }
    ],
    modules: {
      a: {
        /* 开启命名空间 */
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.text', state)
            state.text = text
          }
        },
        getters: {
          /**
           *
           * @param state 当前state
           * @param getters 当前所有的getter方法
           * @param rootState 全局state
           * @returns {*}
           */
          textPlus (state, getters, rootState) {
            return state.text + rootState.count + rootState.b.text
          }
        },
        actions: {
          // add(ctx){
          //   /*可以拿到执行上下文*/
          //   console.log(ctx)
          // }
          add ({state, commit, rootState}) {
            /* 操作根state */
            commit('updateText', rootState.count)
            /* 如果要用根的mutations里面方法要加{root:true}: */
            commit('updateCount', {num1: 987654}, {root: true})
          }
        }
      },
      b: {
        state: {
          text: 1
        },
        actions: {
          testAction ({commit}) {
            commit('a/updateText', 'b操作a的mutations', {root: true})
          }
        }
      }
    }
  })
  // store热更替
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      // 这里不能写import ,因为import只能在代码的最外层,不能在代码逻辑层写
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }
  return store
}
