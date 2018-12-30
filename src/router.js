import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'
import Team from './views/Team.vue'
import AddExpense from './views/AddExpense.vue'
import ListExpense from './views/ListExpense.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/add',
      name: 'addExpense',
      component: AddExpense
    },
    {
      path: '/list',
      name: 'listExpense',
      component: ListExpense
    }
  ]
})
