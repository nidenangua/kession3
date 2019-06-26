// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Dialog from './components/dialog/Dialog'
import Components from './components'
import './assets/reset/reset.css'
import store from './store'
import ExamComponents from './pages/exam/components'


Vue.config.productionTip = false
Vue.use(Components)
Vue.use(ExamComponents)
Vue.component('KsDialog', Dialog)
/* eslint-disable no-new */
const main=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default main