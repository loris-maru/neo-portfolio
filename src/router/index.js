import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Information from '../views/Information.vue'

const loadView = page => () => import(`@/views/${page}.vue`)

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/information',
    name: 'information',
    component: Information
  },
  {
    path: '/project/:slug',
    name: 'Project',
    component: loadView('Project'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
