import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Errors from '@/pages/Errors'
import PipelineWrapper from '@/pages/PipelineWrapper'
import Telemetry from '@/pages/Telemetry'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Login, name: 'Login' },
    { path: '/pipelines', component: PipelineWrapper, name: 'Home' },
    { path: '/errors', component: Errors, name: 'Errors' },
    { path: '/telemetry', component: Telemetry, name: 'telemetry' }
  ]
})
