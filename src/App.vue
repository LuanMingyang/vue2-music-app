<template>
  <div id="app">
    <router-view/>
    <audio id="audio" :src="songURL" autoplay @timeupdate="updateTime" @ended="nextSong"></audio>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'song',
      'songIndex',
      'playlist',
      'playState',
      'playMethod'
    ]),
    songURL: function () {
      if (this.song.id) {
        return 'http://ws.stream.qqmusic.qq.com/' + this.song.id + '.m4a?fromtag=46'
      }
    }
  },
  methods: {
    ...mapActions([
      'updatePlayingTime',
      'setDuration',
      'changeSongPlay'
    ]),
    updateTime: function () {
      this.updatePlayingTime(document.getElementById('audio').currentTime)
      this.setDuration(document.getElementById('audio').duration)
    },
    nextSong: function () {
      var index = this.songIndex
      if (this.playMethod === 0) {
        index = index + 1
        if (index === this.playlist.length) {
          index = 0
        }
      } else if (this.playMethod === 1) {
        // index不变
      } else if (this.playMethod === 2) {
        index = parseInt((this.playlist.length - 1) * Math.random())
      }
      var nextSong = this.playlist[index]
      this.changeSongPlay({ song: nextSong, index: index })
    }
  },
  watch: {
    playState: function (play) {
      if (play) {
        // 播放器开始播放
        document.getElementById('audio').play()
      } else {
        // 播放器停止播放
        document.getElementById('audio').pause()
      }
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  // -ms-overflow-style: none;
  // overflow: -moz-scrollbars-none;
}

body {
  padding-top: 45px;
  padding-bottom: 56px;
  background-color: #fff;
  font-family: "方正黑体","兰亭细黑","Microsoft YaHei",Arial,Helvetica,sans-serif;
  font-size: 16px;
  color: #333;
  /*禁止页面文字选择*/
  user-select: none;
}

::-webkit-scrollbar {
  display: none;
}

/*禁用长按页面时的弹出菜单*/
a,img {
  -webkit-touch-callout: none;
}

/*去掉input等聚焦时的蓝色边框*/
input,button,select {
  border: 0;
  outline-style: none;
}

/*去掉图片底测默认的3像素空白缝隙，或者用display：block也可以*/
img {
  border: 0;
  vertical-align: middle;
  max-width: 100%;
}

/*去掉列表前的标识*/
ol,ul {
  list-style: none;
}

a {
  color: #333;
  text-decoration: none;
}

/*清除浮动*/
.clearfix::before,.clearfix::after{
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}

@font-face {
  font-family: 'iconfont';  /* project id 471751 */
  src: url('//at.alicdn.com/t/font_471751_3hbkwark1paxlxr.eot');
  src: url('//at.alicdn.com/t/font_471751_3hbkwark1paxlxr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_471751_3hbkwark1paxlxr.woff') format('woff'),
  url('//at.alicdn.com/t/font_471751_3hbkwark1paxlxr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_471751_3hbkwark1paxlxr.svg#iconfont') format('svg');
}

.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
