import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }, {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'layout',
          name: 'layout',
          component: () => import('@/views/layout')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login')
        },
        {
          path: '*',
          name: '404',
          component: () => import('@/views/404')
        },

      ]
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404')
    }
  ]
})
