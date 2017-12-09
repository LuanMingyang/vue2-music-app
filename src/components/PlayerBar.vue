<template>
  <div class="player-wrap" @click="setPlayerShow(true)" v-show="show">
    <div class="album-img-wrap" v-show="playlist.length > 0">
      <img id="album-cover" class="album-img" :src="getAlbumCover">
    </div>
    <div class="music-desc" v-show="playlist.length > 0">
      <p class="music-name">{{ song.name || song.songname }}</p>
      <!-- <p class="msg">左右横滑可切换上下首</p> -->
      <p class="lyric">{{ getCurrentLyric }}</p>
    </div>
    <div class="no-song" v-show="playlist.length === 0">
        QQ音乐 听我想听的音乐
    </div>
    <div class="btn-wrap">
      <i class="iconfont btn btn-play" v-html="playState ? '&#xe710;' : '&#xe6d9;'" @click.stop="play"></i>
      <i class="iconfont btn btn-list" @click.stop="setPlaylistShow(true)">&#xe604;</i>
    </div>
    <!-- 播放列表 -->
    <playlist v-show="playlistShow"></playlist>
    <!-- 播放器 -->
    <player v-show="playerShow"></player>
  </div>
</template>

<script>
import Playlist from '../components/Playlist'
import Player from '../components/Player'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      show: true
    }
  },
  components: {
    Playlist,
    Player
  },
  computed: {
    ...mapState([
      'song',
      'playerShow',
      'playlist',
      'playlistShow',
      'playState',
      'playingTime',
      'currentLyricIndex'
    ]),
    ...mapGetters([
      'getAlbumCover'
    ]),
    // 获取当前歌词
    getCurrentLyric: function () {
      var time = this.playingTime * 1000
      // console.log(this.song.lyric.lyric)
      if (this.song.lyric && this.song.lyric.lyricArr) {
        var lyricArr = this.song.lyric.lyricArr
        var timeArr = this.song.lyric.timeArr

        if(lyricArr.length > 0 && this.currentLyricIndex <= lyricArr.length) {
          if (time < timeArr[this.currentLyricIndex + 1]) {
            if (lyricArr[this.currentLyricIndex] !== '' && lyricArr[this.currentLyricIndex] !== '\n') {
              return lyricArr[this.currentLyricIndex]
            } else {
              this.updateLyricIndex()
              return lyricArr[this.currentLyricIndex - 1]
            }
          } else {
            this.updateLyricIndex()
            return lyricArr[this.currentLyricIndex - 1]
          }
        } 
      }
    }
  },
  methods: {
    ...mapActions([
      'changeSongPlay',
      'play',
      'updateLyricIndex',
      'setPlayerShow',
      'setPlaylistShow'
    ])
  },
  watch: {
    playState: function (play) {
      if (play) {
        // 底部播放条 专辑封面图 开始旋转
        document.getElementById('album-cover').style.animationPlayState = 'running'
      } else {
        // 底部播放条 专辑封面图 停止旋转
        document.getElementById('album-cover').style.animationPlayState = 'paused'
      }
    }
  },
  mounted: function () {
    window.onresize = () => {
      if (window.innerHeight <= 320 || document.body.clientHeight <= 320) { // 页面高度小于320时，隐藏底部播放工具
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  $height: 56px;
  $wrapPadding: 8px;

  .player-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: $wrapPadding 0;
    height: $height;
    border-top: 0.5px solid #ccc;
    background-color: #fff;
    z-index: 999;
  }

  .album-img-wrap {
    float: left;
    padding: 0 12px;
    width: 64px;
    overflow: hidden;

    .album-img {
      width: 100%;
      border-radius: 50%;
      animation: roll360 15s infinite linear;
    }
  }

  .music-desc {
    float: left;
    width: 54%;
    line-height: ( $height - $wrapPadding * 2 ) / 2;

    .msg,
    .music-name,
    .lyric {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .msg {
      font-size: 14px;
      color: #41B883;
    }

    .lyric {
      font-size: 14px;
      color: #666;
    }

    @media screen and (max-width: 359px) {
      width: 51%;
    }
  }

  .no-song {
    float: left;
    padding-left: 15px;
    font-size: 14px;
    line-height: 40px;
    line-height: $height - $wrapPadding * 2;
  }

  .btn-wrap {
    float: right;
    line-height: $height - $wrapPadding * 2;

    .btn {
      margin-right: 10px;
      font-size: 34px;
      color: #41B883;
    }
  }

  @keyframes roll360 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
