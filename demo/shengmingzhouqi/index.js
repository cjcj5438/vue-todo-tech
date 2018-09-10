import Vue from 'vue'

const app=new Vue({
  template: '<div>this is content-{{text}}</div>',
  data:{
    text:0
  },
  beforeCreate(){
    console.log(this.$el,'beforeCreate')
  },
  created(){
    console.log(this.$el,'created')
  },
  beforeMount(){
    console.log(this.$el,'beforeMount')
  },
  mounted(){
    console.log(this.$el,'mounted')
  },
  beforeUpdate(){
    console.log(this,' beforeUpdate')
  },
  beforeUpdate(){
    console.log(this,'beforeUpdate')
  },
  updated(){
    console.log(this,'updated')
  },
  activated(){
    console.log(this,'activated')
  },
  deactivated(){
    console.log(this,'deactivated')
  },
  beforeDestroy(){
    console.log(this,'beforeDestroy')
  },
  destroyed(){
    console.log(this,'destroyed')
  },
  /*render 在before和Mountmounted 中间执行的*/
  render(h){
    console.log('render')
    return h('div',{},this.text)
    throw new TypeError('render Error')
  },
  //只关心自己是否渲染成功.不会关心子组件是否渲染成功, 只有在开发的过程中才用的了
  renderError(h,err){
    return h('div',{},err.stack)
  },
  errorCaptured(){
    // 如果绑在根主键上面可以捕获子组件上所有的错误.除非子组件把想上冒泡的事件禁止了
    // 会向上冒泡, 并且正式环境可以使用
  }
})

app.$mount('#root')

// setInterval(()=>{
//   app.text++;
// },1000)

// setInterval(()=>{
//   //主动销毁. 为取消监听,
//   app.$destroy()
// },1000)


// activated,deactivated 组件的keep-alife 我在后面的组件会详细介绍
//
// 我们加了$el 查看当前dom 使用情况;可以知道我们一般dom操作放在mounted,
//   而数据操作可以放在created和mounted这两个场景;
//
// 那么在服务端渲染的时候是没有 dom 环境的 所以生命周期就只有 create 生命周期
