import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import * as moment from 'moment'

Vue.use(ElementUI);
Vue.prototype.moment = moment;


Vue.filter('fromNow', function (value) {
  if (!value) return ''
  return moment(value).fromNow()
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
