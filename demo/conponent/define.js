import Vue from 'vue'

const comp={
  template:"<div> this is component:{{123}}</div>",
  /*如果我们这个组件不是通过new Vue() 这种方式生成的
  * 而是通过全局注册或者局部注册的时候去使用的话,要写成function(){}
  * 的方法*/
  /*data:{  不对的写法
    text:123
  }*/
  data(){
    return {
      text:123 //不能是全局变量代替
    }
  },
  /*props有什么用?
  * 是用来定义这个组件,在被外部使用的时候,他的一些可变的行为,也就是说,我去定义一个组件的时候
  * 希望这个组件帮我们解决一些通用型的问题,就是说这个组件包含某个功能,主要的目的,就是
  * 处理这些功能,需要不同的配置项,来配置组件的行为,通过props实现可配置的行为
  * 还有就是不能被改,  外部组件约束内部组件的行为的, 相当于就是父组件向子组件传值
  * */
  props:{
    active:{
      type:Boolean,
      required:true,
      //如果使用的是一个对象,那么default 返回一个方法
      // default:{}
      default(){
        return {}
      },
      //还可以更严格的判断.
      validator(value){}
    },

    propOne:String
  }
}
/*vue 官方建议这样注册组件名组件就是一个类
 全局注册组件*/
// Vue.component('CompOne',comp)

new Vue({
  el:'#root',
  /*局部注册组件*/
  components:{
    CompOne:comp
  },
  template:'<comp-one></comp-one>'
})
