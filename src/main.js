import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import * as moment from 'moment'
import store from './store'
import router from './router'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.moment = moment;


Vue.filter('fromNow', function (value) {
  if (!value) return ''
  return moment(value).fromNow()
})


Vue.config.productionTip = false

window.vueApp = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
