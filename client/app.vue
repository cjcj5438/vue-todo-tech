<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}</p>
    <p>{{fullName}}</p>
    <h1>testA:{{testA}}</h1>
    <h1>testB:{{testB}}</h1>
    <h1>testC:{{testC}}</h1>
    <h1>{{textPlus}}</h1>
    <!--<p>{{updateCountAsync}}</p>-->
    <!--<todo></todo>-->
    <router-link to="/app/123">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!--<router-view name="a"></router-view>-->
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  // import Todo from './views/todo/todo.vue'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  // import state from './store/state/state'

// console.log(Header.__docs)

export default {

    components: {
      Header,
      Footer
      // Todo
    },
    computed: {
      // testA(){
      //   return this.$store.state.a.text;
      // },
      // count() {
      //   return this.$store.state.count
      // },
      ...mapState({
        count: 'count',
        testA: state => state.a.text,
        testB: state => state.b.text,
        testC: state => state.c.text
      }),
      // ...mapState({
      //   counter: 'count'
      // }),
      // ...mapState({
      /* 这中写法可以计算 看情况来使用 */
      // counter: (state) => state.count
      // }),
      // fullName() {
      //   return this.$store.getters.fullName
      // }
      // ...mapGetters(['fullName'])
      ...mapGetters({
        fullName: 'fullName',
        textPlus: 'a/textPlus'
      })
    },
    mounted () {
      // console.log(this.$route)
      // console.log(this.$store)
      // let i = 1;
      /*
            setInterval(() => {
              /!*commit 后面只能传一个参数,如果要传多个参数可以用对象包裹*!/
              // this.$store.commit('updateCount', i++)
              this.$store.commit('updateCount', {
                num1:i++,
                num2:0
              })
            }, 1000)

      this.$store.dispatch('updateCountAsync', {
        num1: 3,
        time: 0
      }) */
      /* ...map 帮助方法之后 */
      // setInterval(() => {
      //   this.updateCount({
      //     num1: i++,
      //     num2: 2
      //   })
      // }, 1000)

      this.updateCountAsync({
        num1: 3,
        time: 0
      })
      // this.updateText('123')
      this['a/updateText']('123')
      this['a/add']()
      this.testAction()
    },

    methods: {
      ...mapMutations(['updateCount', 'a/updateText']),
      ...mapActions(['updateCountAsync', 'a/add', 'testAction'])
    }
  }
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }

  #cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
</style>


