import Vue from 'vue'
import Router from 'vue-router'
import MusicHall from '@/pages/MusicHall'
import Search from '@/pages/Search'
import User from '@/pages/User'
import Discover from '@/pages/Discover'
import AllRank from '@/pages/AllRank'
import Rank from '@/pages/Rank'
import Singer from '@/pages/Singer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'musicHall',
      component: MusicHall
    },
    {
      path: '/index',
      name: 'musicHall',
      component: MusicHall
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/discover',
      name: 'discover',
      component: Discover
    },
    {
      path: '/rank',
      name: 'allrank',
      component: AllRank
    },
    {
      path: '/rank/:topid ',
      name: 'rank',
      component: Rank,
      props: true
    },
    {
      path: '/singer/:singermid',
      name: 'singer',
      component: Singer,
      props: true
    }
  ]
})
