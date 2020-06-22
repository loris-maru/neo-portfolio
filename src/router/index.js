import Vue from 'vue'
import VueRouter from 'vue-router'

const loadView = page => () => import(`@/views/${page}.vue`)

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: '/informations',
    name: 'informations',
    component: loadView('Information')
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
