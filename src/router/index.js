import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login'
import Signup from '../views/Signup'
import ListTodo from '../views/ListTodo'
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
    path: '/todos',
    name: 'Todos',
    component: ListTodo
  }
]


export default new Router({
  routes, mode: 'history'
})
