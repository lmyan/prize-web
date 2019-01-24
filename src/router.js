import Vue from 'vue'
import Router from 'vue-router'
import Prize from '@/views/Prize'
import PrizeDetail from '@/views/PrizeDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'prize',
      component: Prize
    },
    {
      path: '/prize-detail',
      name: 'prize-detail',
      component: PrizeDetail
    }
  ]
})
