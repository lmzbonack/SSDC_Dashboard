import Vue from 'vue'
// import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import VueUp from 'vueup'
import VueNavigationBar from 'vue-navigation-bar'
import VueGoodTablePlugin from 'vue-good-table'

import App from './App.vue'
// import PipelineWrapper from './pages/PipelineWrapper.vue'
// import Telemetry from './pages/Telemetry.vue'
// import Errors from './pages/Errors.vue'
import router from './router'

import 'vue-navigation-bar/dist/vue-navigation-bar.css'
import 'vue-good-table/dist/vue-good-table.css'

Vue.config.productionTip = false

// Vue.use(VueRouter)
Vue.use(VModal)
Vue.use(VueUp)
Vue.use(VueGoodTablePlugin)

Vue.component('vue-navigation-bar', VueNavigationBar)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
