import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Element from 'element-ui';
import store from './store';
import './mock';
import './permission';
// process.env.NODE_ENV==="development"?require('./mock'):false
Vue.config.productionTip = false;

Vue.use(Element, {
  // size: Cookies.get('size') || 'medium'
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');