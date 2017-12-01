<template>
  <div class="playlist-wrap">
    <div class="mask" @click.stop="setPlaylistShow(false)"></div>
    <div class="playlist">
      <!-- 顶部用户操作按钮（下载、添加、清空等） -->
      <header class="clearfix">
        <div class="play-method">
          <i class="iconfont btn-play-method" v-html="getPlayMethod.icon" @click.stop="changePlayMethod(playMethod)"></i>
          <span class="play-method-text">{{ getPlayMethod.text }}</span><span class="playlist-length" v-show="playMethod !== 1">({{ playlist.length }}首)</span>
        </div>
        <div class="right-btns">
          <i class="iconfont btn-download">&#xe890;</i>
          <i class="iconfont btn-add">&#xe632;</i>
          <i class="iconfont btn-clear" @click.stop="clearPlaylist">&#xe620;</i>
        </div>
      </header>
      <!-- 歌曲列表 -->
      <ul class="song-list">
        <li class="song" v-for="(song, index) in playlist" :key="index" :class="judgePlaying(song) ? 'active' : ''" @click.stop="clickSong(song, index)">
          <p>{{ song.name || song.songname }}<span> - {{ song.singer[0].name }}</span></p>
          <i class="iconfont btn-like" @click.stop="like(song)" :class="judgeLiked(song) ? 'liked' : ''" v-html="judgeLiked(song) ? '&#xe699;' : '&#xe607;'"></i>
          <i class="iconfont btn-delete" @click.stop="deleteSong(index)">&#xe65d;</i>
        </li>
      </ul>
      <!-- 关闭按钮 -->
      <button class="btn-close" @click.stop="setPlaylistShow(false)">关闭</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      likedSongs: [] // 我喜欢的歌曲
    }
  },
  computed: {
    ...mapState({
      songPlaying: 'song',
      playMethod: 'playMethod',
      playlist: 'playlist',
      playlistShow: 'playlistShow'
    }),
    ...mapGetters([
      'getPlayMethod'
    ])
  },
  methods: {
    ...mapActions([
      'playerInit',
      'changePlayMethod',
      'setPlaylistShow',
      'changeSongPlay',
      'updatePlaylist'
    ]),
    // 切换歌曲
    clickSong: function (song, index) {
      this.changeSongPlay({ song, index })
    },
    // 清空播放列表
    clearPlaylist: function () {
      this.updatePlaylist([])
      this.playerInit()
    },
    // 判断歌曲是否正在播放
    judgePlaying: function (song) {
      if (!song.id) {
        song.id = song.songid
      }
      if (this.songPlaying.id) {
        return this.songPlaying.id === song.id
      }
      if (this.songPlaying.songid) {
        return this.songPlaying.songid === song.id
      }
      return false
    },
    // 判断歌曲是否已标记为我喜欢
    judgeLiked: function (song) {
      if (!song.id) {
        song.id = song.songid
      }
      return this.likedSongs.indexOf(song.id) > 0
    },
    // 标记/取消标记 歌曲为我喜欢
    like: function (song) {
      if (!song.id) {
        song.id = song.songid
      }
      var liked = this.judgeLiked(song)
      if (liked) {
        var index = this.likedSongs.indexOf(song.id)
        this.likedSongs.splice(index, 1)
      } else {
        this.likedSongs.push(song.id)
      }
      localStorage.likedSongs = JSON.stringify(this.likedSongs)
    },
    // 从播放列表删除指定歌曲
    deleteSong: function (index) {
      var list = this.playlist
      list.splice(index, 1)
      this.updatePlaylist(list)
    }
  },
  watch: {
    playlistShow: function (show) {
      // if (show) {
      //   document.body.style.overflowY = 'hidden'
      // } else {
      //   document.body.style.overflowY = 'auto'
      // }
    }
  },
  created: function () {
    // 获取已标记为喜欢的歌曲
    if (localStorage.likedSongs) {
      this.likedSongs = JSON.parse(localStorage.likedSongs)
    }
  }
}
</script>

<style lang="scss" scoped>
$padding: 15px;
$gray: rgba(255, 255, 255, 0.6);

.playlist-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
  }

  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    color: #fff;
    // background-color: #1d232d;
    background-color: rgba(29, 35, 45, .95);
    overflow-y: auto;
  }
}

header {
  position: fixed;
  margin: 0; // 不用top/left/right/bottom，用margin实现相对父元素绝对定位
  padding: 0 $padding;
  width: 100%;
  font-weight: lighter;
  line-height: 55px;
  background-color: #1d232d;
  border-bottom: 0.5px solid rgba(255, 255, 255, .2);
  z-index: 999;

  .iconfont {
    vertical-align: middle;
  }

  .play-method {
    float: left;

    .btn-play-method {
      padding: 10px 5px 10px 0;
      font-size: 30px;
    }

    .play-method-text {
      letter-spacing: 1px;
    }

    .playlist-length {
      color: $gray;
    }
  }

  .right-btns {
    float: right;

    .iconfont {
      margin-left: 18px;
      padding: 10px 0 10px 10px;
      font-size: 24px;
      color: $gray;
    }
  }
}

.song-list {
  margin: 55px 0;

  .song {
    position: relative;
    padding: 0 $padding;
    line-height: 50px;
    border-bottom: 0.5px solid rgba(255, 255, 255, .03);

    p {
      width: 80%;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    span {
      font-size: 12px;
      color: $gray;
    }

    &.active {
      color: #41B883;

      span {
        color: #41B883;
      }
    }

    .iconfont {
      position: absolute;
      top: 0;
      right: $padding;
      font-size: 20px;
      color: $gray;
      vertical-align: middle
    }

    .btn-like {
      font-size: 22px;
      top: 2px;
      right: $padding * 4;

      &.liked {
        color: #e84a4a;
      }
    }
  }
}

.btn-close {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 55px;
  font-size: 16px;
  color: #fff;
  line-height: 55px;
  text-align: center;
  background-color: #1d232d;
  border: 0;
}
</style>
