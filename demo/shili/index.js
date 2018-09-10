import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: '<div ref="dd">{{text}} - {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // ,watch: {
  //   text: (newText, oldText)=> {
  //     console.log(`${newText}:${oldText}`)
  //   }
  // }
})

let i = 0
setInterval(()=> {
  i++;
  // app.text +=1;//为什么没有变化  //有效
  // app.$data.text += 1 //有效

  // app.$data.obj.a=i
  app.$forceUpdate()
  app.$set(app.obj, "a", i) //给新的值赋值
  // app.$delete 删除
  app.$nextTick()//连续修改了dom 事件之后.做dom跟新
  // app.$option.data.text+=1 //无效

}, 1000)

console.log(app.$data)//实例的原数据
console.log(app.$props)// 在组件传值的时候会使用到
console.log(app.$el)//对用的html的节点
console.log(app.$options)//可以传入的参数
// 只有再次渲染的时候才能 render
app.$options.render = (h)=> {
  return h("div", {}, "new render function")
}
// 属性:
console.log(app.$root)
console.log(app.$root === app)//true

console.log(app.$children)//<item><div></div></item> 就是里面的div

console.log(app.$scopedSlots) //插槽
console.log(app.$slots)

console.log(app.$refs)//用于快速找到实例

console.log(app.$isServer)//服务端渲染时候用到

// 方法:
// 当然也可以写在实例里面,
const unWatch = app.$watch('text', (newText, oldText)=> {
  console.log(`${newText}:${oldText}`)
});
//注销 watch
setTimeout(()=> {
  unWatch()
}, 5000);

// 事件监听 once 只触发一次
app.$on('test',(a,b)=>{
  console.log('test emited',a,b)
});
app.$emit('test',1,2);
//强制组件进行跟新
app.$forceUpdate()

