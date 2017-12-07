<template>
  <div class="container" v-if="singer">
    <!-- 顶部固定不变的页头 -->
    <div id="fixedHeader" class="fixedHeader">
      <i class="iconfont btn-back" @click="goBack">&#xe605;</i>
      <h1 v-show="showFixedTitle">{{ singer.singer_name }}</h1>
      <i class="iconfont btn btn-menu">&#xe725;</i>
    </div>
    <div class="header">
      <div id="background" class="background" :style="{ backgroundImage: 'url(' + getSingerPic + ')' }"><div class="mask"></div></div>
      <!-- 顶部的下方的歌手信息 -->
      <div id="singer-info" class="singer-info">
        <p class="singer-name">{{ singer.singer_name }}</p>
        <p class="singer-fans">————— <span>{{ singer.fans | fansNumberFormat }}粉丝</span> —————</p>
        <span class="follow" @click="follow"><i class="iconfont icon-get" v-show="followed">&#xe608;</i><span v-html="followed ? '已关注' : '关注'"></span></span>
        <span class="medal">勋章</span>
      </div>
    </div>
    <div id="content" class="main-content" v-if="data" :class="showFixedTitle ? 'fixed' : ''" @scroll="contentScroll">
      <!-- 导航 -->
      <div id="nav-wrap" class="nav-wrap" :class="showFixedTitle ? 'fixed' : ''">
        <ul class="nav clearfix">
          <li :class="[activeIndex === 0 ? 'active' : '']" @click="changeNav(0)">歌曲 {{ singer.total }}</li>
          <li :class="[activeIndex === 1 ? 'active' : '']" @click="changeNav(1)">专辑 {{ singer.albumTotal }}</li>
          <li :class="[activeIndex === 2 ? 'active' : '']" @click="changeNav(2)">MV {{ singer.mvTotal }}</li>
          <li :class="[activeIndex === 3 ? 'active' : '']" @click="changeNav(3)">详情</li>
        </ul>
      </div>
      <!-- 歌曲列表 -->
      <ul class="song-list" v-if="activeIndex === 0">
        <song-list-item v-for="(song, index) in data.list" :key="song.musicData.songid"
        :songList="data.list" :song="song.musicData" :songid="song.musicData.songid" :sindex="index" :songname="song.musicData.songname" :isOnly="song.musicData.isonly" :haveMV="false"
        :singer="song.musicData.singer[0].name" :album="song.musicData.albumname"></song-list-item>
      </ul>
      <!-- 专辑列表 -->
      <ul class="album-list" v-if="activeIndex === 1">
        <album-or-m-v-list-item v-for="album in data.list" :key="album.albumID" :type="'album'" :name="album.albumName" 
          :pic="album.albumPic" :publicTime="album.pubTime" :showInto="true">
        </album-or-m-v-list-item>
      </ul>
      <!-- MV列表 -->
      <ul class="mv-list" v-if="activeIndex === 2">
        <album-or-m-v-list-item v-for="mv in data.list" :key="mv.id" :type="'mv'" :name="mv.title" 
          :pic="mv.pic" :publicTime="mv.date" :showInto="false">
        </album-or-m-v-list-item>
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
import AlbumOrMVListItem from '../components/AlbumOrMVListItem'
import API from '../config/api'
import { mapState } from 'vuex'

export default {
  props: ['singermid'],
  data: function () {
    return {
      showFixedTitle: false, // 是否显示 最顶部歌手姓名
      singer: null, // 歌手
      followedSinger: [], // 所有已关注歌手
      activeIndex: 0, // 当前导航
      data: null // 请求到的数据（歌曲、专辑、MV等）
    }
  },
  components: {
    PlayerBar,
    SongListItem,
    AlbumOrMVListItem
  },
  computed: {
    ...mapState([
      'playlist'
    ]),
    followed: function () {
      var index = this.followedSinger.indexOf(this.singermid)
      return index > -1
    },
    getSingerPic: function () {
      return 'http://y.gtimg.cn/music/photo_new/T001R300x300M000' + this.singermid + '.jpg?max_age=2592000'
    }
  },
  methods: {
    // 返回
    goBack: function () {
      window.history.back()
    },
    // 关注/取消关注
    follow: function () {
      if (this.followed) {
        var index = this.followedSinger.indexOf(this.singermid)
        this.followedSinger.splice(index, 1)
      } else {
        this.followedSinger.push(this.singermid)
      }
      localStorage.followedSinger = JSON.stringify(this.followedSinger)
    },
    // 切换导航
    changeNav: function (index) {
      this.activeIndex = index
      this.requestData()
    },
    // 请求数据
    requestData: function () {
      var url = ''
      switch (this.activeIndex) {
        case 0:
          url = API.URL_SINGER_SONGS // 歌曲搜索
          break
        case 1:
          url = API.URL_SINGER_ALBUM // 专辑搜索
          break
        case 2:
          url = API.URL_SINGER_MVS // MV搜索
          break
        case 3:
          url = API.URL_SINGER_DESC // 详情搜索
          break
      }
      this.$http.jsonp(url,
        {
          params: {
            begin: 0,
            num: 16,
            singermid: this.singermid
          },
          jsonp: 'jsonpCallback'
        }
      ).then((response) => {
        // console.log(response.data.data)
        this.data = response.data.data
      }).catch(function (response) {
        console.log(response)
      })
    },
    // 列表滚动事件
    contentScroll: function () {
      var top = document.getElementById('content').scrollTop
      if (top === 0) {
        document.getElementById('fixedHeader').style.backgroundColor = 'transparent'
        document.getElementById('background').style.filter = 'none'
        this.showFixedTitle = false
      }
    }
  },
  filters: {
    fansNumberFormat: function (number) {
      return (parseInt(number) / 10000).toFixed(1) + '万'
    }
  },
  created: function () {
    // 获取已关注歌手
    if (localStorage.followedSinger) {
      this.followedSinger = JSON.parse(localStorage.followedSinger)
    }
    // 请求歌手信息
    this.$http.jsonp(API.URL_SINGER_TRACK,
      {
        params: {
          begin: 0,
          num: 8,
          _: new Date().getTime(),
          singermid: this.singermid
        },
        jsonp: 'jsonpCallback'
      }
    ).then((response) => {
      // console.log(response.data.data)
      this.singer = response.data.data
    }).catch(function (response) {
      console.log(response)
    })
    // 默认请求歌曲
    this.requestData()
  },
  mounted: function () {
    window.addEventListener('scroll', () => {
      var afterScrollY = window.scrollY
      if (afterScrollY > 0 && afterScrollY < 215) {
        var percent = afterScrollY / 215
        document.getElementById('fixedHeader').style.backgroundColor = 'rgba(0, 0, 0, ' + percent * 0.3 + ')'
        document.getElementById('background').style.filter = 'blur(' + percent * 8 + 'px)'
        this.showFixedTitle = false
      } else if (afterScrollY > 215) { // 向下滚动距离大于215
        document.getElementById('fixedHeader').style.backgroundColor = 'rgba(0, 0, 0, .3)'
        document.getElementById('background').style.filter = 'blur(8px)'
        this.showFixedTitle = true
      } else if (this.showFixedTitle && afterScrollY === 0) {
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
      background-color: rgba(0, 0, 0, .15);
    }
  }

  .singer-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-weight: lighter;
    text-align: center;

    .singer-name {
      font-size: 26px;
      // line-height: 40px;
      letter-spacing: 2px;
    }

    .singer-fans {
      position: relative;
      font-size: 12px;
      color: rgba(255, 255, 255, .2);
      line-height: 30px;

      span {
        color: rgba(255, 255, 255, .6);
        letter-spacing: 1px;
      }
    }

    .follow,
    .medal {
      display: inline-block;
      margin: 0 5px 10px 5px;
      width: 84px;
      height: 28px;
      line-height: 28px;
      border: 0.8px solid #fff;
      border-radius: 20px;
    }

    .icon-get {
      margin: 3px;
      color: $green;
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
      width: 25%;
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
    // margin-top: 0;
  }
}

.main-content {
  position: relative;
  margin-top: $headerHeight - $fixedHeight;
  width: 100%;
  background-color: #fff;
  z-index: 99;

  .song-list {
    padding-left: 10px;
    background-color: #fff;
  }

  .album-list, .mv-list {
    background-color: #fff;
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
