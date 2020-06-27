import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Auth from '../components/auth/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
]

const router = new VueRouter({
  routes,
})

export default router
