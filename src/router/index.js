import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GoogleMap from '@/components/GoogleMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/googleMap',
      name: 'GoogleMap',
      component: GoogleMap
    }
  ]
})
