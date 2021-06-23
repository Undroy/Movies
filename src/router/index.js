import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/topmovies'
import Upcoming from '@/components/upcomingmovies'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Top
    },
    {
      path: '/top',
      name: 'Top Movies',
      component: Top
    },
    {
      path: '/upcoming',
      name: 'Upcoming Movies',
      component: Upcoming
    }
  ]
})
