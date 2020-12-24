import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Logout from '../views/Logout'
import ListTodo from '../views/ListTodo'
import { auth } from '../plugins/firebase'
Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/',
    name: "Todos",
    component: ListTodo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  }
]

let router = new Router({
  routes, mode: 'history'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {

    next()
  }
})

export default router