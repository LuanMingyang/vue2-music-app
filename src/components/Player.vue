<template>
  <div id="player-box-wrap" class="player-box-wrap" v-if="song.id">
    <div id="background-img" class="background"></div>
    <div class="player-box">
      <i class="iconfont btn btn-hide" @click.stop="setPlayerShow(false)">&#xe70f;</i>
      <i class="iconfont btn btn-menu">&#xe725;</i>
      <h1 class="song-name">{{ getSong.name }}</h1>

      <div class="song-info-top">
        <p class="song-singer">—&nbsp;&nbsp;<span>{{ song.singer[0].name }}</span>&nbsp;&nbsp;—</p>
        <p class="tags">
          <i class="iconfont icon-sq">&#xe8a9;</i>
          <i class="iconfont icon-only">&#xe8aa;</i>
        </p>
        <div class="song-album-cover">
          <img :src="getAlbumCover">
        </div>
        <p class="lyric">{{ getCurrentLyric }}</p>
      </div>

      <div class="bottom">
        <!-- 播放进度 -->
        <div class="range-wrap">
          <span class="currentTime">{{ playingTime | playingTimeFormat }}</span>
          <input type="range" id="range" class="range" min="0" :max="duration" :value="playingTime" />
          <span class="duration">{{ duration | durationFormat }}</span>
        </div>
        <!-- 开始暂停、下一首等按钮 -->
        <div class="play-operations">
          <i class="iconfont btn-play-method" v-html="getPlayMethod.icon" @click.stop="changePlayMethod(playMethod)"></i>
          <i class="iconfont btn-prev" @click.stop="prevSong">&#xe8ab;</i>
          <i class="iconfont btn-play" v-html="playState ? '&#xe710;' : '&#xe6d9;'" @click.stop="play"></i>
          <i class="iconfont btn-next" @click.stop="nextSong">&#xe617;</i>
          <i class="iconfont btn-play-list" @click.stop="setPlaylistShow(true)">&#xe604;</i>
        </div>
        <!-- 分享、下载等按钮 -->
        <div class="other-operations">
          <i class="iconfont btn-like" @click.stop="setSongLiked(song)" :class="liked ? 'liked' : ''" v-html="liked ? '&#xe699;' : '&#xe607;'"></i>
          <i class="iconfont btn-download">&#xe890;</i>
          <i class="iconfont btn-share">&#xe60d;</i>
          <i class="iconfont btn-comment">&#xe694;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'playMethod',
      'playState',
      'song',
      'songIndex',
      'playlist',
      'duration',
      'playingTime',
      'currentLyricIndex',
      'likedSongs'
    ]),
    ...mapGetters([
      'getAlbumCover',
      'getPlayMethod'
    ]),
    // 获取歌曲
    getSong: function () {
      if(!this.song.id) {
        this.song.id = this.song.songid
      }
      if(!this.song.name) {
        this.song.name = this.song.songname
      }
      return this.song
    },
    // 获取当前歌曲是否已被标记为我喜欢
    liked: function () {
      var index = this.likedSongs.indexOf(this.getSong.id)
      return index > -1
    },
    // 获取当前歌词
    getCurrentLyric: function () {
      var time = this.playingTime * 1000
      // console.log(this.song.lyric.lyric)
      if (this.song.lyric && this.song.lyric.lyricArr) {
        var lyricArr = this.song.lyric.lyricArr
        var timeArr = this.song.lyric.timeArr

        if(lyricArr.length > 0) {
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
      'play',
      'setPlayerShow',
      'changeSongPlay',
      'updatePlayingTime',
      'updateLyricIndex',
      'changePlayMethod',
      'setPlaylistShow',
      'setSongLiked'
    ]),
    // 上一首
    prevSong: function () {
      var index = this.songIndex
      if (this.playMethod === 0) {
        if (index === 0) {
          index = this.playlist.length
        }
        index = index - 1
      } else if (this.playMethod === 1) {
        // index不变
      } else if (this.playMethod === 2) {
        index = parseInt((this.playlist.length - 1) * Math.random())
      }
      var prevSong = this.playlist[index]
      this.changeSongPlay({ song: prevSong, index: index })
    },
    // 下一首
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
    getAlbumCover: function (url) {
      if (document.getElementById('background-img')) {
        document.getElementById('background-img').style.backgroundImage = 'url(' + url + ')'
      } else {
        setTimeout(function () {
          document.getElementById('background-img').style.backgroundImage = 'url(' + url + ')'
        }, 1000)
      }
    }
  },
  filters: {
    durationFormat: function (duration) {
      var minutes = parseInt(duration / 60)
      var seconds = parseInt(duration % 60)
      return (Array(2).join(0) + minutes).slice(-2) + ':' + (Array(2).join(0) + seconds).slice(-2)
    },
    playingTimeFormat: function (time) {
      var minutes = parseInt(time / 60)
      var seconds = parseInt(time % 60)
      return (Array(2).join(0) + minutes).slice(-2) + ':' + (Array(2).join(0) + seconds).slice(-2)
    }
  }
}
</script>


<style lang="scss" scoped>
$green: #41B883;
$gray: rgba(255, 255, 255, 0.6);
$mainPadding: 15px;

.player-box-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(8px);
    transform: scale(1.05);
  }

  .player-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: $gray;
    background-color: rgba(0, 0, 0, .7);
  }

  .btn {
    position: absolute;
    color: $gray;
  }

  .btn-hide {
    top: 0;
    left: 0;
    padding: 0 $mainPadding;
    font-size: 18px;
    line-height: 60px;
  }

  .btn-menu {
    top: 0;
    right: 0;
    padding: 0 $mainPadding;
    font-size: 18px;
    line-height: 60px;
  }
}

.song-name {
  margin: 0 auto;
  width: 75%;
  font-size: 18px;
  color: #fff;
  letter-spacing: 2px;
  font-weight: lighter;
  text-align: center;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.song-info-top {
  text-align: center;

  .song-singer {
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: lighter;

    span {
      color: #fff;
    }
  }

  .tags {
    margin: $mainPadding - 10px 0;

    .iconfont {
      font-size: 36px;
      // -webkit-text-stroke-width: unset;
    }
  }

  .song-album-cover {
    // padding: $mainPadding 0;

    img {
      width: 65%;
      border: 5px solid rgba(0, 0, 0, .3);
      border-radius: 50%;
      animation: roll360 25s infinite linear;
    }
  }

  .lyric {
    padding: 15px;
    height: 50px;
    color: $green;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 25px;
}

.range-wrap {
  font-size: 12px;
  line-height: 50px;

  span {
    display: inline-block;
    width: 15%;
    text-align: center;
  }

  .range {
    position: relative;
    top: -2px;
    width: 67%;
    height: 3px;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: $gray;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      position: relative;
      -webkit-appearance: none;
      background-color: $green;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      cursor: pointer;
    }

    &::-moz-range-track {
      background-color: $gray;
    }

    &::-moz-range-thumb {
      position: relative;
      -moz-appearance: none;
      background-color: $green;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }
  }
}

.play-operations {
  padding: 0 $mainPadding;
  text-align: center;
  line-height: 80px;

  .iconfont {
    display: inline-block;
    vertical-align: middle;
    // -webkit-text-stroke-width: unset;
  }

  .btn-play-method {
    float: left;
    font-size: 28px;
  }

  .btn-prev {
    margin-right: 25px;
    font-size: 36px;
    color: $green;
  }

  .btn-play {
    font-size: 60px;
    color: $green;
  }

  .btn-next {
    margin-left: 25px;
    font-size: 36px;
    color: $green;
  }

  .btn-play-list {
    float: right;
    font-size: 24px;
  }
}

.other-operations {
  padding: 0 5%;

  .iconfont {
    display: inline-block;
    width: 23%;
    font-size: 28px;
    line-height: 50px;
    text-align: center;
    vertical-align: middle;
  }

  .btn-like.liked {
    color: #e84a4a
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
