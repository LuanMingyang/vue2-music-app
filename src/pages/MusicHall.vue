<template>
  <div class="container">
    <head-nav :activeIndex="activeIndex"></head-nav>
    <div class="content">
      <recommend-swiper :recommends="recommends"></recommend-swiper>
      <menu-list></menu-list>
      <div class="part">
        <song-list-recom :recomSongList="recomSongList"></song-list-recom>
      </div>
      <div class="part">
        <mv-recom :recomMVist="recomMVist"></mv-recom>
      </div>
    </div>
    <footer>
      <player-bar></player-bar>
    </footer>
  </div>
</template>

<script>
// 导入要用到的子组件
import HeadNav from '../components/HeadNav'
import RecommendSwiper from '../components/RecommendSwiper'
import MenuList from '../components/MenuList'
import SongListRecom from '../components/SongListRecom'
import MvRecom from '../components/MvRecom'
import PlayerBar from '../components/PlayerBar'
import API from '../config/api'
import { mapActions } from 'vuex'

export default {
  data: function () {
    return {
      activeIndex: 1,
      recommends: [],
      recomSongList: [],
      recomMVist: []
    }
  },
  // 在components字段中，包含导入的子组件
  components: {
    HeadNav,
    RecommendSwiper,
    MenuList,
    SongListRecom,
    MvRecom,
    PlayerBar
  },
  methods: {
    ...mapActions([
      'stateInit'
    ])
  },
  mounted: function () {
    // 状态初始化
    this.stateInit()
    // 请求首页数据
    this.$http.jsonp(API.URL_RRCOM,
      {
        params: {
          tpl: 'v12',
          rnd: 0
        },
        jsonp: 'jsonpCallback'
      }
    ).then((response) => {
      // console.log(response.data.data)
      this.recommends = response.data.data.focus
      this.recomSongList = response.data.data.hotdiss.list.slice(0, 6)
      this.recomMVist = response.data.data.shoubomv.all.slice(0, 4)
    }).catch(function (response) {
      console.log(response)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 35px;
}
</style>
