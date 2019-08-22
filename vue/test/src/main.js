// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/styles/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/mock'
import request from '@/util/request'
import 'babel-polyfill'
Vue.prototype.$request = request
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */

var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
console.log(vm)
