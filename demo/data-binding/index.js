import Vue from 'vue'

var globaVar='111'//eslint-disable-line
const app=new Vue({
  template: '<div>this is content-{{isActive}}-{{globaVar}}</div>',
  data:{
    isActive:false
  }
})

app.$mount('#root')
