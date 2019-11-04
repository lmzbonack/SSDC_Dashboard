import Vue from 'vue'
import VModal from 'vue-js-modal'
import VueUp from 'vueup'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

Vue.use(VModal)
Vue.use(VueUp)
