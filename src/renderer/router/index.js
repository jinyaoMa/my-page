import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/start',
      name: 'start-page',
      component: require('@/components/StartPage').default
    },
    {
      path: '/work',
      name: 'work-page',
      component: require('@/components/WorkPage').default
    },
    {
      path: '*',
      redirect: '/start'
    }
  ]
})
