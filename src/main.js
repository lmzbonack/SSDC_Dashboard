import Vue from 'vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import VueUp from 'vueup'
import VueNavigationBar from 'vue-navigation-bar'

import App from './App.vue'
import PipelineWrapper from './pages/PipelineWrapper.vue'
import Telemetry from './pages/Telemetry.vue'
import Errors from './pages/Errors.vue'

import 'vue-navigation-bar/dist/vue-navigation-bar.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VModal)
Vue.use(VueUp)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: PipelineWrapper, name: 'Home' },
    { path: '/errors', component: Errors, name: 'Errors' },
    { path: '/telemetry', component: Telemetry, name: 'telemetry' }
  ]
})

Vue.component('vue-navigation-bar', VueNavigationBar)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
