<template>
  <div class="container" v-if="rank">
    <!-- 顶部固定不变的页头 -->
    <div id="fixedHeader" class="fixedHeader">
      <i class="iconfont btn-back" @click="goBack">&#xe605;</i>
      <h1 v-show="showFixedTitle">{{ rank.topinfo.ListName }}</h1>
      <i class="iconfont btn btn-menu">&#xe725;</i>
    </div>
    <div class="header">
      <div id="background" class="background" :style="{ backgroundImage: 'url(' + rank.topinfo.pic_album + ')' }"><div class="mask"></div></div>
      <!-- 顶部的下方的排行榜信息 -->
      <div class="rank-info">
        <p class="rank-name">{{ rank.topinfo.ListName }} 第{{ rank.day_of_year }}天</p>
        <p class="rank-time">{{ rank.date }} 更新</p>
      </div>
    </div>

    <div id="content" class="main-content" :class="showFixedTitle ? 'fixed' : ''" @scroll="contentScroll">
      <!-- 导航 -->
      <div class="nav-wrap" :class="showFixedTitle ? 'fixed' : ''">
        <ul class="nav clearfix">
          <li :class="[activeIndex === 0 ? 'active' : '']" @click="changeNav(0)">歌曲</li>
          <li :class="[activeIndex === 3 ? 'active' : '']" @click="changeNav(3)">详情</li>
        </ul>
      </div>
      <!-- 歌曲列表 -->
      <ul class="song-list" v-if="activeIndex === 0">
        <song-list-item v-for="(song, index) in rank.songlist" :key="song.data.songid"
        :songList="rank.songlist" :song="song.data" :songid="song.data.songid" :sindex="index" :songname="song.data.songname" :isOnly="song.data.isonly" :haveMV="false"
        :singer="song.data.singer[0].name" :album="song.data.albumname"></song-list-item>
      </ul>
    </div>

    <!-- 底部播放条 -->
    <footer>
      <player-bar></player-bar>
    </footer>
  </div>
</template>

<script>
import PlayerBar from '../components/PlayerBar'
import SongListItem from '../components/SongListItem'
import API from '../config/api'
import { mapState } from 'vuex'

export default {
  props: ['topid'],
  data: function () {
    return {
      scroll: null, // 滚动距离
      showFixedTitle: false, // 是否显示 最顶部排行榜名
      rank: null, // 请求到的排行榜数据
      activeIndex: 0
    }
  },
  components: {
    PlayerBar,
    SongListItem
  },
  methods: {
    // 返回
    goBack: function () {
      window.history.back()
    },
    // 切换导航
    changeNav: function (index) {
      this.activeIndex = index
    },
    // 列表滚动事件
    contentScroll: function () {
      var top = this.scroll
      this.scroll = document.getElementById('content').scrollTop
      
      if (this.scroll === 0 && top > this.scroll) {
        document.getElementById('fixedHeader').style.backgroundColor = 'transparent'
        document.getElementById('background').style.filter = 'none'
        this.showFixedTitle = false
      } else if (top > this.scroll) { // 上滚

      } else if (top < this.scroll) { // 下滚

      }
    }
  },
  created: function () {
    // 请求排行榜数据
    this.$http.jsonp(API.URL_TOPLIST_LIST,
      {
        params: {
          topid: this.topid
        },
        jsonp: 'jsonpCallback'
      }
    ).then((response) => {
      // console.log(response.data)
      this.rank = response.data
    }).catch(function (response) {
      console.log(response)
    })
  },
  mounted: function () {
    // 滚动事件监听
    window.addEventListener('scroll', () => {
      var afterScrollY = window.scrollY
      console.log(afterScrollY)
      
      if (afterScrollY > 0 && afterScrollY < 215) { // 向下滚动距离小于215
        var percent = afterScrollY / 215
        document.getElementById('fixedHeader').style.backgroundColor = 'rgba(0, 0, 0, ' + percent * 0.3 + ')'
        document.getElementById('background').style.filter = 'blur(' + percent * 8 + 'px)'
        this.showFixedTitle = false
      } else if (afterScrollY > 215) { // 向下滚动距离大于215
        document.getElementById('fixedHeader').style.backgroundColor = 'rgba(0, 0, 0, .3)'
        document.getElementById('background').style.filter = 'blur(8px)'
        this.showFixedTitle = true
      } else if (this.showFixedTitle && afterScrollY === 0) { // content设置为fixed时
        this.showFixedTitle = true
      }
    }, false)
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 260px;
$fixedHeight: 45px;
$green: #41B883;

.fixedHeader {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: $fixedHeight;
  color: #fff;
  text-align: center;
  line-height: $fixedHeight;
  z-index: 9999;
  // background-color: rgba(0, 0, 0, .3);

  h1 {
    font-size: 16px;
    font-weight: normal;
  }

  .btn-back {
    position: absolute;
    color: #fff;
    top: 0;
    left: 0;
    padding: 0 15px;
    font-size: 24px;
    line-height: $fixedHeight;
  }

  .btn-menu {
    position: absolute;
    color: #fff;
    top: 0;
    right: 0;
    padding: 0 15px;
    font-size: 22px;
    line-height: $fixedHeight;
  }
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: $headerHeight;
  color: #fff;

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    // filter: blur(8px);
    transform: scale(1.05);

    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .6);
    }
  }

  .rank-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-weight: lighter;
    text-align: center;

    .rank-name {
      // line-height: 40px;
      letter-spacing: 1px;
    }

    .rank-time {
      position: relative;
      font-size: 12px;
      line-height: 30px;
    }
  }
}

.nav-wrap {
  width: 100%;
  background-color: #fff;
  z-index: 999;

  .nav {
    padding: 0 3%;
    border-bottom: 0.5px solid #ccc;

    li {
      float: left;
      width: 50%;
      height: $fixedHeight - 3px;
      color: #666;
      text-align: center;
      line-height: $fixedHeight - 3px;

      &.active {
        color: $green;
        border-bottom: 3px solid $green;
      }
    }
  }

  &.fixed {
    position: fixed;
    top: $fixedHeight;
  }
}

.main-content {
  position: relative;
  margin-top: $headerHeight - $fixedHeight;
  background-color: #fff;
  z-index: 999;

  .song-list {
    padding-left: 10px;
  }

  &.fixed {
    position: fixed;
    top: $fixedHeight + $fixedHeight - 3px;
    bottom: 60px;
    margin-top: 0;
    overflow: auto;
  }
}
</style>
