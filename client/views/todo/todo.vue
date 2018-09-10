<template>
  <section class="real-app">
    <input type="text" class="add-input" autofocus="autofocus" placeholder="接下去要做什么？" @keyup.enter="addTodo">
    <item  :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo" />
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"/>
    <router-view></router-view>
  </section>
</template>

<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'

  let id = 0
  export default {
    beforeRouteEnter (to, from, next) {
      // 可以在这里使用数据请求
      console.log('todo before enter', this)
      next(vm => {
        console.log('after enter vm.id is ', vm.id)
      })
    },
    /* 在相同路径下面.都是使用同一个组件时 mounted只会执行一次,所以要使用beforeRouteUpdate */
    beforeRouteUpdate (to, from, next) {
      console.log('todo update enter')
      next()
    },
    beforeRouteLeave (to, from, next) {
      // 离开页面的时候.做判断
      console.log('todo leave enter')
      if (global.confirm('are you sure?')) {
        next()
      }
    },
    data () {
      return {
        todos: [],
        filter: 'all'
      }
    },
    props: ['id'],

    mounted () {
      console.log(this.id)
    },
    components: {
      Item,
      Tabs
    },
    computed: {
      filteredTodos () {
        if (this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo (e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = ''
      },
      deleteTodo (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter (state) {
        this.filter = state
      },
      clearAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .real-app {
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
  }

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>


