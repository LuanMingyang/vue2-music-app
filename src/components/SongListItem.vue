<template>
  <li @click="clickSong(song, sindex)" class="song" :class="songPlaying.id === songid || songPlaying.songid === songid && songPlaying.id ? 'active' : ''">
    <p class="song-name">{{ songname }} <i class="iconfont icon icon-only" v-if="isOnly === 1">&#xe8aa;</i></p>
    <p class="song-info"><span class="song-singer">{{ singer }}</span>·{{ album }}</p>
    <i class="iconfont btn-right btn-mv" v-if="haveMV">&#xe79d;</i>
    <i class="iconfont btn-right btn-show-menu">&#xe725;</i>
  </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['songList', 'song', 'songid', 'sindex', 'songname', 'singer', 'album', 'isOnly', 'haveMV'],
  computed : {
    ...mapState({
      songPlaying: 'song'
    })
  },
  methods: {
    ...mapActions([
      'updatePlaylist',
      'changeSongPlay'
    ]),
    clickSong: function (song, index) {
      // 更新播放列表
      this.updatePlaylist(this.songList)
      // 切换歌曲
      this.changeSongPlay({ song, index })
    }
  }
}
</script>


<style lang="scss" scoped>
.song {
  position: relative;
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 0.5px solid #ddd;

  .song-name {
    // line-height: 30px;
    margin-bottom: 8px;
    padding-right: 30px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .icon-only {
    font-size: 26px;
    color: #41B883;
  }

  .song-info {
    padding-right: 30px;
    font-size: 14px;
    color: #777;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    .song-singer {
      color: #333;
    }
  }

  .btn-right {
    position: absolute;
    padding: 25px 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;

    &.btn-show-menu {
      right: 0;
    }

    &.btn-mv {
      right: 40px;
      font-size: 22px;
    }
  }

  &.active {
    color: #41B883;

    .song-info {
      color: #41B883;

      .song-singer {
        color: #41B883;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: -10px;
      padding: 10px 0;
      width: 3px;
      background-color: #41B883;
      box-sizing: border-box;
    }
  }
}
</style>
